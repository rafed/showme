import { Component, OnInit } from '@angular/core';
import { Paper } from '../../../utils/Paper';
import { GenerateGraphService } from '../../service/generate-graph.service';
//import * as cytoscape from 'cytoscape';
declare var cytoscape: any;
declare var qtip: any;
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['../../../assets/bootstrap/css/bootstrap.min.css','./graph.component.css']
})
export class GraphComponent implements OnInit {
  cy: any;
  mainPDF: any;
  reference: any;

  snippets= ['Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  'Second Snippet',
  'Third Snippet'];

  constructor(private generateGraphService: GenerateGraphService) { }
  

  ngOnInit() {
    console.log('graph');
    var dynamicScripts = ["../../../assets/bootstrap/js/bootstrap.min.js"];

    for (var i = 0; i < dynamicScripts.length; i++) {
        let node = document.createElement('script');
        node.src = dynamicScripts [i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    }

    this.cy = cytoscape({
      container: document.getElementById('cy'), // container to render in

      style: [ // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': '#6495ED',
            'label': 'data(id)', //author dile author dekhabe
            'width': '40',
            'height': '40',
            'text-valign': 'center',
            'font-size': '4',
            //'text-max-width':'35',
            "text-wrap": 'wrap'
          }
        },

        {
          selector: 'edge',
          style: {
            'curve-style': 'bezier',
            'width': 1,
            'line-color': '#191970',
            'target-arrow-color': '#191970', //keno dorkar bujhi ni
            'target-arrow-shape': 'triangle' //keno dorkar bujhi ni
          }
        }
      ],
    });

    this.cy.minZoom(0.5);

    this.generateGraphService.getBibtex()
      .subscribe(bib => {
        this.mainPDF = bib;
        console.log(this.mainPDF);

        this.generateGraphService.getReferenceData()
          .subscribe(referenceList => {
            this.reference = referenceList;
            //console.log(this.reference[0]);
            console.log(this.reference);
            this.buildGraph();
          });
      });
  }



  buildGraph() {

    let newNodes = [];
    let newEdges = [];

    let str = this.mainPDF["title"];
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
        console.log("title: " + mainTitle);
        break;
      }

    }
    newNodes.push(
      {
        group: "nodes",
        data: {
          id: mainTitle, //
          title: this.mainPDF.title
        }
      }
    );
    console.log(this.reference.length);
    for (let i = 0; i < this.reference.length; i++) {
      let value = this.reference[i];
      //alert(value);
      //alert(i+" "+value["title"]);
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
          console.log(title);
          break;
        }
      }

      newNodes.push(
        {
          group: "nodes",
          data: {
            id: title, //value["title"], 
            Journal: value["journal"],
            title: value["title"]
          }
        }
      );
      newEdges.push(
        {
          group: "edges",
          data: {
            id: i,
            source: mainTitle,
            target: title //value["title"],
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
    let iDiv = document.createElement('div');
    iDiv.id = 'OuterDiv';
    iDiv.setAttribute('display','none');
    document.getElementsByTagName('body')[0].appendChild(iDiv);


    for (let i = 0; i < edges.length; i++) {
      let innerDiv;
      console.log(edges[i].id());
    
      //innerDiv.removeChild('div');
      innerDiv = document.createElement('div');
      //innerDiv.id = edges[i].id();
      innerDiv.innerHTML = "<div class='carousel slide' data-interval='false'>" +
        "                        <div class='carousel-inner' id="+ edges[i].id()+"></div>" +
        "                        <button class='snippetButton carousel-control left' href='#DemoCarousel' data-slide='prev'>" +
        "                        <span class='glyphicon glyphicon-chevron-left'></span></button>" +
        "                        <button class='snippetButton carousel-control right' href='#DemoCarousel' data-slide='next'>" +
        "                        <span class='glyphicon glyphicon-chevron-right'></span> </button>" +
        "                        </div><br/><p style='color: #FFD119; font-size:20px; text-align: center'>Rate Relationship</p>";

      let x = 0;
      iDiv.appendChild(innerDiv);
      //console.log(edges[i].id());
      for (let x = 0; x < this.snippets.length; x++) {
        if (x == 0) {
          let option = "<div class='item active'><h2>" + "<p style='font-size:20px;text-align: center'><b>Snippet: " + (x + 1) + "</b></p>" + this.snippets[x] + "</h2></div>";
          document.getElementById(edges[i].id()).innerHTML += option;
        }
        else {
          let option = "<div class='item'><h2>" + "<p style='font-size:20px;text-align: center'><b>Snippet: " + (x + 1) + "</b></p>" + this.snippets[x] + "</h2></div>";
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
          return innerDiv;
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
          
                          console.log(value);
                          //$("[name=rating]").attr("value",value);
                      }
                  }
              });

              
            //this.myFunction();
            //this.snippets = []
          }
        }
      });
    }
      // outside node on click
      this.cy.qtip({
        content: 'kono node nai mama ekhane',
        position: {
          my: 'top center',
          at: 'bottom center'
        },
        show: {
          cyBgOnly: true
        },
        style: {

          tip: {
            width: 16,
            height: 8
          }
        }
      });

      // hover
      this.cy.nodes().qtip({
        overwrite: false,
        show: {
          event: 'mouseover'
        },
        hide: {
          event: 'mouseout'
        },
        content: function () { return this.data('title') },
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
  }

}
