import { Component, OnInit } from '@angular/core';
import { Paper } from '../../../utils/Paper';
import { GenerateGraphService } from '../../service/generate-graph.service';
//import * as cytoscape from 'cytoscape';
declare var cytoscape: any;

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['../../../assets/bootstrap/css/bootstrap.min.css','./graph.component.css']
})
export class GraphComponent implements OnInit {
  cy: any;
  mainPDF:any;
  reference:any;
  constructor(private generateGraphService: GenerateGraphService) { }

  ngOnInit() {
    console.log('graph');
    // var dynamicScripts = ["../../../assets/cytoscape.js"];

    // for (var i = 0; i < dynamicScripts .length; i++) {
    //     let node = document.createElement('script');
    //     node.src = dynamicScripts [i];
    //     node.type = 'text/javascript';
    //     node.async = false;
    //     node.charset = 'utf-8';
    //     document.getElementsByTagName('head')[0].appendChild(node);
    // }
    
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
						'text-valign' : 'center',
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
        this.mainPDF=bib;
        console.log(this.mainPDF);

        this.generateGraphService.getReferenceData()
          .subscribe(referenceList => {
          this.reference=referenceList;
          //console.log(this.reference[0]);
          console.log(this.reference);
          this.buildGraph();
        });
      });
  }



  buildGraph() {
			
    //var mainPDF = requestPDFData();
    //alert("HI" + mainPDF);
    //alert("TITLE "+mainPDF.title);
    //var reference=requestReferenceData();

    let newNodes=[];
    let newEdges=[];
    
    let str=this.mainPDF["title"];
    //console.log(str);
    let arr = str.match(/[0-9A-Za-z_:)'"-]+/gi);
    //alert("L"+array1.length);
    let mainTitle="";
    let count=0;
    for(let x = 0 ; x < arr.length-1 ; x++)
    {
      //console.log("W" +array1[x]);
      if(arr[x].length+ arr[x+1].length<20)
      {
        mainTitle=mainTitle+arr[x]+" "+ arr[x+1]+"\n";
        x++;
      } 
      else{
        mainTitle=mainTitle+arr[x]+"\n";
      }
      count++;
      if(count>3){
        console.log("title: "+mainTitle);
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
    for(let i=0;i<this.reference.length;i++){
      let value = this.reference[i];
      //alert(value);
      //alert(i+" "+value["title"]);
      str=value["title"];
      
      let arr = str.match(/[0-9A-Za-z_:)'"-]+/gi);
      //alert("L"+array1.length);
      let title="";
      let count=0;
      for(let x = 0 ; x < arr.length-1 ; x++)
      {
        //console.log("W" +array1[x]);
        if(arr[x].length+ arr[x+1].length<20)
        {
          title=title+arr[x]+" "+ arr[x+1]+"\n";
          x++;
        } 
        else{
          title=title+arr[x]+"\n";
        }
        count++;
        if(count>3){
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
            id:i,
            source: mainTitle, 
            target: title //value["title"],
          } 
        }
      );
    }
    
    this.cy.add(newNodes);
    this.cy.add(newEdges);
    
    // on click
    // this.cy.elements().qtip({
    //   overwrite: false,
      
    //   content: function(){ return "Click "+ this.id() },
    //   position: {
    //     my: 'top center',
    //     at: 'bottom center'
    //   },
    //   style: {
    //     tip: {
    //       width: 16,
    //       height: 8
    //     }
    //   }		
    // });
    // // outside node on click
    // cy.qtip({
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

    // // hover
    // cy.elements().qtip({
    //   overwrite: false,
    //   show: {
    //     event: 'mouseover'
    //   },
    //   hide: {
    //     event: 'mouseout'
    //   },
    //   content: function(){ return this.data('title') },
    //   position: {
    //     my: 'top center',
    //     at: 'bottom center'
    //   },
    //   style: {
    //     classes: 'qtip-bootstrap',
    //     tip: {
    //       width: 16,
    //       height: 8
    //     }
    //   }		
    // });

    
    let layout = this.cy.layout({ name: 'concentric' }); //concentric, cose, circle

    layout.run();
    
  }
}
