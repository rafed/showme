import { Component, OnInit } from '@angular/core';
import { Paper } from '../../../utils/Paper';
import { GenerateGraphService } from '../../service/generate-graph.service';
import { RatingService } from '../../service/rating.service';
//import * as cytoscape from 'cytoscape';
declare var cytoscape: any;
declare var qtip: any;
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['../../../assets/bootstrap/css/bootstrap.min.css', './graph.component.css']
})
export class GraphComponent implements OnInit {
  cy: any;
  mainPDF: any;
  reference: any;
  showGraph = false;
  filterData: any;

  filterGraph(){
    if (document.getElementById("").getAttribute){

    }

  }

  
  snippets = ['Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    'Second Snippet',
    'Third Snippet'];

  constructor(private generateGraphService: GenerateGraphService,
    private ratingService: RatingService) { }

  ngOnInit() {
    console.log('graph');
    var dynamicScripts = ["../../../assets/bootstrap/js/bootstrap.min.js"];

    for (var i = 0; i < dynamicScripts.length; i++) {
      let node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }


    this.filterGraph();
    this.generateGraphService.getBibtex()
      .subscribe(bib => {
        this.showGraph = false;
        this.mainPDF = bib;
        console.log(this.mainPDF);

        this.generateGraphService.getReferenceData()
          .subscribe(
            referenceList => {
            console.log('ref peyechi');
            this.showGraph=true;
            this.reference = referenceList;
            //console.log(this.reference[0]);
            console.log(this.reference);
            
            this.buildGraph();

          },
          err => {
            alert("This PDF Format is not supported by ShowMe")
          });
      });

      let node =document.getElementById("edgeID");

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => this.handleRating());
      });

      observer.observe(node, {
        attributes: true,
        characterData: true
      });
  }

  buildGraph() {
   
    this.cy = cytoscape({
      container: document.getElementById('cy'), // container to render in
      wheelSensitivity: 0.3,
      style: [ // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': '#6495ED',
            'label': 'data(id)', 
            'width': '40',
            'height': '40',
            'text-valign': 'center',
            'font-size': '4',
            "text-wrap": 'wrap'
          }
        },

        {
          selector: 'edge',
          style: {
            'curve-style': 'bezier',
            'width': 1,
            'line-color': '#191970',
            'target-arrow-color': '#191970', 
            'target-arrow-shape': 'triangle' 
          }
        }
      ],
    });

    this.cy.minZoom(1);

    let newNodes = [];
    let newEdges = [];

    let str = this.mainPDF["title"];
    if(str==null){
      str="not available";
    }
    
    //console.log(str);
    let arr = str.match(/[0-9A-Za-z_:)'"-]+/gi);
    //alert("L"+array1.length);
    let mainTitle = "";
    let count = 0;
    for (let x = 0; x < arr.length - 1; x++) {
      //console.log("W" +array1[x]);
      if (arr[x].length + arr[x + 1].length < 20) {
        mainTitle = mainTitle + arr[x] + " " + arr[x + 1] + "\n";
        x++;
      }
      else {
        mainTitle = mainTitle + arr[x] + "\n";
      }
      count++;
      if (count > 3) {
        break;
      }
    }

    let author="";
    if(this.mainPDF["authors"]==null){
      author="not available";
    }

    for(let i=0; i<this.mainPDF["authors"].length;i++ ){
      if(i!=0)
        author=author+", "+this.mainPDF["authors"][i];
      else
      author=this.mainPDF["authors"][0];
    }

    let journal=this.mainPDF["journal"];
    if(journal==null){
      journal="not available";
    }
    console.log(author);
    newNodes.push(
      {
        group: "nodes",
        data: {
          id: mainTitle, //
          title: this.mainPDF.title,
          journal: this.mainPDF["journal"],
          author: author
        }
      }
    );
    //console.log(this.reference.length);
    for (let i = 0; i < this.reference.length; i++) {
      let value = this.reference[i];
      
      str = value["title"];

      let arr = str.match(/[0-9A-Za-z_:)'"-]+/gi);
      //alert("L"+array1.length);
      let title = "";
      let count = 0;
      for (let x = 0; x < arr.length - 1; x++) {
        //console.log("W" +array1[x]);
        if (arr[x].length + arr[x + 1].length < 20) {
          title = title + arr[x] + " " + arr[x + 1] + "\n";
          x++;
        }
        else {
          title = title + arr[x] + "\n";
        }
        count++;
        if (count > 3) {
          //console.log(title);
          break;
        }
      }

      author="";
      for(let i=0; i<value["authors"].length;i++ ){
        if(i!=0)
          author=author+", "+value["authors"][i];
        else
        author=value["authors"][i];

      }
      console.log(author);
      newNodes.push(
        {
          group: "nodes",
          data: {
            id: title, //value["title"], 
            journal: value["journal"],
            title: value["title"],
            author:author
          }
        }
      );
      newEdges.push(
        {
          group: "edges",
          data: {
            id: value["edge_id"],
            source: mainTitle,
            target: title, //value["title"],
            author: author
          }
        }
      );
    }

    this.cy.add(newNodes);
    this.cy.add(newEdges);

    this.cy.nodes().on("click", function () {
      console.log('node click korechi');
    });

    let edges = this.cy.edges();
    let iDiv=document.getElementById('OuterDiv');
    if(iDiv==null){
      //console.log("nei");
      iDiv = document.createElement('div');
      iDiv.id = 'OuterDiv';
      iDiv.style.display='none';
      document.getElementsByTagName('body')[0].appendChild(iDiv);
    }

    for (let i = 0; i < edges.length; i++) {
      this.snippets=this.reference[i]["snippets"];
      let innerDiv;
      //console.log(edges[i].id());

      //innerDiv.removeChild('div');
      if(document.getElementById("innerDiv"+edges[i].id())==null){
        //console.log('nei');
        innerDiv = document.createElement('div');
        innerDiv.id = "innerDiv"+edges[i].id();
        innerDiv.innerHTML = "<div id=DemoCarousel"+ edges[i].id() +" class='carousel slide' data-interval='false'>" +
          "                        <div class='carousel-inner' id=" + edges[i].id() + "></div>" +
          "                        <button class='snippetButton carousel-control left'"+" href='#DemoCarousel"+ edges[i].id() + "' data-slide='prev'>" +
          "                        <span class='glyphicon glyphicon-chevron-left'></span></button>" +
          "                        <button class='snippetButton carousel-control right' "+" href='#DemoCarousel"+ edges[i].id() + "' data-slide='next'>" +
          "                        <span class='glyphicon glyphicon-chevron-right'></span> </button>" +
          "                        </div><br/><p style='color: #FFD119; font-size:20px; text-align: center'>Rate Relationship</p>";

        let x = 0;
        iDiv.appendChild(innerDiv);
      }
      document.getElementById(edges[i].id()).innerHTML=""; 
      let length=this.snippets.length;     
      for (let x = 0; x < length; x++) {
        if (x == 0) {
          let option = "<div class='item active'><h2>" + "<p style='font-size:20px;text-align: center'><b>Snippet: " + (x + 1) + "/" + length + "</b></p>" + this.snippets[x] + "</h2></div>";
          document.getElementById(edges[i].id()).innerHTML += option;
        }
        else {
          let option = "<div class='item'><h2>" + "<p style='font-size:20px;text-align: center'><b>Snippet: " + (x + 1)  + "/"+length + "</b></p>" + this.snippets[x] + "</h2></div>";
          document.getElementById(edges[i].id()).innerHTML += option;
        }
      }

      //on edge click
      edges[i].qtip({
        id: edges[i].id(),
        overwrite: false,
        html: true,
        content: function () {
          //return "Click edge "+ this.id()
          return document.getElementById("innerDiv"+edges[i].id());
        },
        position: {
          my: 'top center',
          at: 'bottom center'
        },
        style: {
          classes: 'rate',
          width: 500,
          // tip: {
          //   width: 16,
          //   height: 8
          // }
        },
        events: {
          show: function () {
            console.log("HI");
            $('.rate').starrr({
              rating: 0,
              max: 5,
              change: function (e, value) {
                //console.log("HI");
                if (value) {
                  let edgeID=e.target.id;
                  edgeID=edgeID.substring(5,edgeID.length);

                  $("[name=edgeID]").attr("value",edgeID);
                  $("[name=rating]").attr("value",value);

                  
                  
                  //$("[name=rating]").attr("value",value);
                }
              }
            });


            //this.myFunction();
            // this.snippets = [];
          }
        }
      });
    }
    // outside node on click
    // this.cy.qtip({
    //   content: 'kono node nai mama ekhane',
    //   position: {
    //     my: 'top center',
    //     at: 'bottom center'
    //   },
    //   show: {
    //     cyBgOnly: true
    //   },
    //   style: {

    //     tip: {
    //       width: 16,
    //       height: 8
    //     }
    //   }
    // });

    // hover
    this.cy.nodes().qtip({
      overwrite: false,
      show: {
        event: 'mouseover'
      },
      hide: {
        event: 'mouseout'
      },
      content: function () { return "Title: " +this.data('title')+ 
      "<br> Author:"+this.data('author')},
      position: {
        my: 'top center',
        at: 'bottom center'
      },
      style: {
        classes: 'qtip-bootstrap',
        tip: {
          width: 16,
          height: 8
        }
      }
    });

    //
    let layout = this.cy.layout({ name: 'concentric' }); //concentric, cose, circle

    layout.run();

  }

  handleRating(){
    console.log('rate');
    let token=localStorage.getItem('token');
    //console.log(edgeID+' '+value);
    if(token==null){
      alert('Please login first');
    }
    else {
      let edgeID=document.getElementById("edgeID").getAttribute("value");
      let rating=document.getElementById("rating").getAttribute("value");
      this.ratingService.sendRating(JSON.parse(token), edgeID ,rating);
    }
  }
  toggleJournal(){
    if(document.getElementById("ShowJournal").getAttribute("disabled")=="true"){
      document.getElementById("ShowJournal").removeAttribute("disabled");
      document.getElementById("RemoveJournal").setAttribute("disabled","true");
    }
    else {
      document.getElementById("RemoveJournal").removeAttribute("disabled");
      document.getElementById("ShowJournal").setAttribute("disabled","true");
    }
  }
  togglePublishedIn(){
    if(document.getElementById("ShowPublishedIn").getAttribute("disabled")=="true"){
      document.getElementById("ShowPublishedIn").removeAttribute("disabled");
      document.getElementById("RemovePublishedIn").setAttribute("disabled","true");
    }
    else {
      document.getElementById("RemovePublishedIn").removeAttribute("disabled");
      document.getElementById("ShowPublishedIn").setAttribute("disabled","true");
    }
  }
  toggleTitle(){
    if(document.getElementById("ShowTitle").getAttribute("disabled")=="true"){
      document.getElementById("ShowTitle").removeAttribute("disabled");
      document.getElementById("RemoveTitle").setAttribute("disabled","true");
    }
    else {
      document.getElementById("RemoveTitle").removeAttribute("disabled");
      document.getElementById("ShowTitle").setAttribute("disabled","true");
    }
  }
  toggleAuthor(){
    if(document.getElementById("ShowAuthor").getAttribute("disabled")=="true"){
      document.getElementById("ShowAuthor").removeAttribute("disabled");
      document.getElementById("RemoveAuthor").setAttribute("disabled","true");
    }
    else {
      document.getElementById("RemoveAuthor").removeAttribute("disabled");
      document.getElementById("ShowAuthor").setAttribute("disabled","true");
    }
  }
  setRadio(type: string){
    if (type=='Journal'){
      document.getElementById("JournalValue").removeAttribute("disabled");
      document.getElementById("PublishedInValue").setAttribute("disabled","true");
      document.getElementById("TitleValue").setAttribute("disabled","true");
      document.getElementById("AuthorValue").setAttribute("disabled","true");
    }
    else if (type=='PublishedIn'){
      document.getElementById("PublishedInValue").removeAttribute("disabled");
      document.getElementById("JournalValue").setAttribute("disabled","true");
      document.getElementById("TitleValue").setAttribute("disabled","true");
      document.getElementById("AuthorValue").setAttribute("disabled","true");
    }
    else if (type=='Title'){
      document.getElementById("TitleValue").removeAttribute("disabled");
      document.getElementById("JournalValue").setAttribute("disabled","true");
      document.getElementById("PublishedInValue").setAttribute("disabled","true");
      document.getElementById("AuthorValue").setAttribute("disabled","true");
    }
    else if (type=='Author'){
      document.getElementById("AuthorValue").removeAttribute("disabled");
      document.getElementById("JournalValue").setAttribute("disabled","true");
      document.getElementById("TitleValue").setAttribute("disabled","true");
      document.getElementById("PublishedInValue").setAttribute("disabled","true");
    }
  }
}

