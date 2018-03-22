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
  filteringValue="";
  filteringCriteria = 'Title';
  journalValue="";
  yearValue="";
  titleValue="";
  authorValue="";
  filteringOption='ShowTitle';
  nodeCollection: any;
  edgeCollection: any;
  
  snippets = [];

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
    let token=localStorage.getItem('token');
    let readOnly=false;
    if(token==null){
      readOnly=true;
    }
    this.cy = cytoscape({
      container: document.getElementById('cy'), // container to render in
      wheelSensitivity: 0.3,
      style: [ // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': '#6495ED',
            'label': 'data(label)', 
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

    let author=this.mainPDF["authors"];
    if(author==null){
      author="not available";
    }

    let journal=this.mainPDF["journal"];
    if(journal==null){
      journal="not available";
    }

    let year=this.mainPDF["year"];
    if(year==null){
      year="not available";
    }

    newNodes.push(
      {
        group: "nodes",
        data: {
          id: this.mainPDF.id,
          label: mainTitle, //
          title: this.mainPDF.title,
          journal: journal,
          author: author,//author
          year: year
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
      
      year=value["year"];
      if(year==null){
        year="not available";
      }

      author=value["authors"];
      if(author==null){
        author="not available";
      }
    
      journal=value["journal"];
      if(journal==null){
        journal="not available";
      }

      newNodes.push(
        {
          group: "nodes",
          data: {
            id: value["id"],
            label: title, //value["title"], 
            journal: journal,
            title: value["title"],
            author: author,
            year: year
          }
        }
      );
      newEdges.push(
        {
          group: "edges",
          data: {
            id: 'e'+value["edge_id"],
            source: this.mainPDF.id,
            target: value["id"] //value["title"],
          }
        }
      );
    }

    this.cy.add(newNodes);
    this.cy.add(newEdges);

    // this.elementCollection=this.cy.elements().clone();
    // console.log("TOTAL Clone "+this.elementCollection.length);

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
        if(readOnly){
          innerDiv.innerHTML=innerDiv.innerHTML+"<br/><p style='color: #FFD119; font-size:12px; text-align: center'>Please Login to Rate</p>";
        }
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
      let inVal=0;
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
        },
        events: {
          show: function () {
            //console.log("HI");
            $('.rate').starrr({
              rating: 0,//inVal,//0,
              max: 5,
              readOnly: readOnly,
              change: function (e, value) {
                  let edgeID=e.target.id;
                  edgeID=edgeID.substring(6,edgeID.length);
                  $("[name=edgeID]").attr("value",edgeID);
                  $("[name=rating]").attr("value",value);
              }
            });

          }
        }
      });
    }

    // hover
    this.cy.nodes().qtip({
      overwrite: false,
      show: {
        event: 'mouseover'
      },
      hide: {
        event: 'mouseout'
      },
      content: function () { return "Title: " + this.data('title') + 
      "<br> Author:"+this.data('author') + "<br> Year:"+this.data('year') +
      "<br> Journal:"+this.data('journal')},
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

  
    let layout = this.cy.layout({ name: 'concentric' }); //concentric, cose, circle
    layout.run();

  }

  handleRating(){
    //console.log('rate');
    let token=localStorage.getItem('token');
    
    let edgeID=document.getElementById("edgeID").getAttribute("value");
    let rating=document.getElementById("rating").getAttribute("value");
    this.ratingService.sendRating(JSON.parse(token), edgeID ,rating);
  }

  toggleJournal(){
    if(document.getElementById("ShowJournal").getAttribute("disabled")=="true"){
      document.getElementById("ShowJournal").removeAttribute("disabled");
      document.getElementById("RemoveJournal").setAttribute("disabled","true");
      this.filteringOption="RemoveJournal";
    }
    else {
      document.getElementById("RemoveJournal").removeAttribute("disabled");
      document.getElementById("ShowJournal").setAttribute("disabled","true");
      this.filteringOption="ShowJournal";
    }
    console.log("TJ "+this.filteringOption);
  }

  toggleYear(){
    if(document.getElementById("ShowYear").getAttribute("disabled")=="true"){
      document.getElementById("ShowYear").removeAttribute("disabled");
      document.getElementById("RemoveYear").setAttribute("disabled","true");
      this.filteringOption="RemoveYear";
    }
    else {
      console.log('ELSE');
      document.getElementById("RemoveYear").removeAttribute("disabled");
      document.getElementById("ShowYear").setAttribute("disabled","true");
      this.filteringOption="ShowYear";
    }
    console.log("TY "+this.filteringOption);
  }

  toggleTitle(){
    if(document.getElementById("ShowTitle").getAttribute("disabled")=="true"){
      document.getElementById("ShowTitle").removeAttribute("disabled");
      document.getElementById("RemoveTitle").setAttribute("disabled","true");
      this.filteringOption="RemoveTitle";
    }
    else {
      document.getElementById("RemoveTitle").removeAttribute("disabled");
      document.getElementById("ShowTitle").setAttribute("disabled","true");
      this.filteringOption="ShowTitle";
    }
    console.log("TT "+ this.filteringOption);
  }

  toggleAuthor(){
    if(document.getElementById("ShowAuthor").getAttribute("disabled")=="true"){
      document.getElementById("ShowAuthor").removeAttribute("disabled");
      document.getElementById("RemoveAuthor").setAttribute("disabled","true");
      this.filteringOption="RemoveAuthor";
    }
    else {
      document.getElementById("RemoveAuthor").removeAttribute("disabled");
      document.getElementById("ShowAuthor").setAttribute("disabled","true");
      this.filteringOption="ShowAuthor";
    }
    console.log("TA "+this.filteringOption);
  }

  setRadio(type: string){
    this.journalValue="";
    this.authorValue="";
    this.yearValue="";
    this.titleValue="";
    this.filteringCriteria=type;
    if (type=='Journal'){
      document.getElementById("JournalValue").removeAttribute("disabled");
      if(document.getElementById("ShowJournal").getAttribute("disabled")=="true"){
        this.filteringOption="ShowJournal";
      }
      else {
        this.filteringOption="RemoveJournal";
      }
      document.getElementById("YearValue").setAttribute("disabled","true");
      document.getElementById("TitleValue").setAttribute("disabled","true");
      document.getElementById("AuthorValue").setAttribute("disabled","true");
    }
    else if (type=='Year'){
      //this.filteringOption="ShowYear";
      document.getElementById("YearValue").removeAttribute("disabled");
      if(document.getElementById("ShowYear").getAttribute("disabled")=="true"){
        this.filteringOption="ShowYear";
      }
      else {
        this.filteringOption="RemoveYear";
      }
      document.getElementById("JournalValue").setAttribute("disabled","true");
      document.getElementById("TitleValue").setAttribute("disabled","true");
      document.getElementById("AuthorValue").setAttribute("disabled","true");
    }
    else if (type=='Title'){
      //this.filteringOption="ShowTitle";
      document.getElementById("TitleValue").removeAttribute("disabled");
      if(document.getElementById("ShowTitle").getAttribute("disabled")=="true"){
        this.filteringOption="ShowTitle";
      }
      else {
        this.filteringOption="RemoveTitle";
      }
      document.getElementById("JournalValue").setAttribute("disabled","true");
      document.getElementById("YearValue").setAttribute("disabled","true");
      document.getElementById("AuthorValue").setAttribute("disabled","true");
    }
    else if (type=='Author'){
      //this.filteringOption="ShowAuthor";
      document.getElementById("AuthorValue").removeAttribute("disabled");
      if(document.getElementById("ShowAuthor").getAttribute("disabled")=="true"){
        this.filteringOption="ShowAuthor";
      }
      else {
        this.filteringOption="RemoveAuthor";
      }
      document.getElementById("JournalValue").setAttribute("disabled","true");
      document.getElementById("TitleValue").setAttribute("disabled","true");
      document.getElementById("YearValue").setAttribute("disabled","true");
    }
    console.log("RADIO"+this.filteringOption);
  }

  filterGraph(){
    this.undoFiltering();
    // if (this.filteringOption==""){
    //   this.filteringOption = 'Show' + this.filteringCriteria;
    //   console.log('empty');
    // }

    console.log(this.filteringCriteria+" "+this.filteringOption);

    if(this.authorValue!="") {
      console.log(this.authorValue);
      document.getElementById("AuthorValue").setAttribute('value',this.authorValue);
      if(this.filteringOption=="ShowAuthor") {
        this.nodeCollection = this.cy.nodes().filter(function( ele ){
          //console.log(ele.data('author').indexOf(document.getElementById("AuthorValue").getAttribute('value')));
          return (ele.data('author').indexOf(document.getElementById("AuthorValue").getAttribute('value')) <= -1) ;
        });   
      }
      else {
        this.nodeCollection = this.cy.nodes().filter(function( ele ){
          //console.log(ele.data('author').indexOf(document.getElementById("AuthorValue").getAttribute('value')));
          return (ele.data('author').indexOf(document.getElementById("AuthorValue").getAttribute('value')) > -1) ;
        });
      }
    }

    else if(this.journalValue!=""){
      console.log(this.journalValue);
     
      document.getElementById("JournalValue").setAttribute('value',this.journalValue);
      if(this.filteringOption=="ShowJournal") {
        this.nodeCollection = this.cy.nodes().filter(function( ele ) {
          //console.log(ele.data('title'));          
          //console.log(document.getElementById("JournalValue").getAttribute('value'));
          return (ele.data('journal').indexOf(document.getElementById("JournalValue").getAttribute('value')) <= -1) ;
        });   
      }
      else {
        this.nodeCollection = this.cy.nodes().filter(function( ele ) {
          return (ele.data('journal').indexOf(document.getElementById("JournalValue").getAttribute('value')) > -1) ;
        });
      }
    }

    else if(this.yearValue!=""){
      console.log(this.yearValue);
      let condition;
      if(this.filteringOption=="ShowYear") {
        condition="[year!='"+this.yearValue+"']";   
      }
      else {
        condition="[year='"+this.yearValue+"']";
      }
      //console.log(condition);
      this.nodeCollection= this.cy.nodes().filter(condition); 
    }

    else {
      console.log(this.titleValue);
      document.getElementById("TitleValue").setAttribute('value',this.titleValue);
      if(this.filteringOption=="ShowTitle") {
        this.nodeCollection = this.cy.nodes().filter(function( ele ){
          return (ele.data('title').indexOf(document.getElementById("TitleValue").getAttribute('value')) <= -1) ;
        });   
      }
      else {
        this.nodeCollection = this.cy.nodes().filter(function( ele ){
          return (ele.data('title').indexOf(document.getElementById("TitleValue").getAttribute('value')) > -1) ;
        });
      }
    }
    
    this.edgeCollection=this.nodeCollection.connectedEdges();
    console.log("LEN: "+this.nodeCollection.length)
    
    for(let i=0;i<this.nodeCollection.length;i++){
     //console.log(this.mainPDF.id);
      if(this.nodeCollection[i].data('id')==this.mainPDF.id){
        continue;
      }
     // console.log(this.nodeCollection[i]);
      this.cy.remove(this.nodeCollection[i]);
    }

    let layout = this.cy.layout({ name: 'concentric' }); 
    layout.run();
  }

  undoFiltering(){
    if(this.nodeCollection){
      this.nodeCollection.restore();
      this.edgeCollection.restore();
    }

    let layout = this.cy.layout({ name: 'concentric' }); 
    layout.run();
  }
}

