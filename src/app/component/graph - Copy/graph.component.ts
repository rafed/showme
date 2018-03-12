import { Component, OnInit } from '@angular/core';
import { Paper } from '../../../utils/Paper';
import { GenerateGraphService } from '../../service/generate-graph.service';
import * as cytoscape from '../../../assets/cytoscape.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['../../../assets/bootstrap/css/bootstrap.min.css','./graph.component.css']
})
export class GraphComponent implements OnInit {
  cy: any;
  constructor(private generateGraphService: GenerateGraphService) { }

  ngOnInit() {
    console.log('graph');
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
						'font-size': '8',
						'text-max-width':'35',
						'text-wrap':'ellipsis',
					}
				},

				{
				  selector: 'edge',
				  style: {
					'width': 1,
					'line-color': '#191970', 
					'target-arrow-color': '#191970', //keno dorkar bujhi ni
					'target-arrow-shape': 'triangle' //keno dorkar bujhi ni
				  }
				}
			],
    });
    this.addNode();
  }

  addNode(): void{
    var info: any[]=[{"volume": 2, "title": "Condensed Cube: An EffectiveApproach to ReducingData CubeSize", "author": ["Wei Wang", "Jianlin Feng", "Hongjun Lu"]},
    [{"raw_string": "S. Acharya, P. B. Gibbons, and V. Poosala. Congressional samples for approximate answering of group-by queries. In SIGMOD 2000, volume 29, pages 487\u2013498, 2000.", "title": "Congressional samples for approximate answering of group-by queries", "journal": "", "author": ["S Acharya", "P B Gibbons", "V Poosala"], "volume": "29", "pages": "487--498"}, 
    {"raw_string": "S. Agarwal, R. Agrawal, P. Deshpande, A. Gupta, J. F. Naughton, R. Ramakrishnan, and S. Sarawagi. On the computation of multidimensional aggregates. In VLDB\u201996, pages 506\u2013521, 1996.", "title": "On the computation of multidimensional aggregates", "journal": "", "author": ["S Agarwal", "R Agrawal", "P Deshpande", "A Gupta", "J F Naughton", "R Ramakrishnan", "S Sarawagi"], "volume": "", "pages": "506--521"}, {"raw_string": "D. Barbar\u00b4a and M. Sullivan. Quasi-cubes: Exploiting approximations in multidimensional databases. SIGMOD Record, 26(3):12\u201317, 1997.", "title": "Quasi-cubes: Exploiting approximations in multidimensional databases", "journal": "SIGMOD Record", "author": ["D Barbar\u00b4a", "M Sullivan"], "volume": "26", "pages": ""}, {"raw_string": "K. S. Beyer and R. Ramakrishnan. Bottom-up computation of sparse and iceberg cubes. In SIGMOD 1999, pages 359\u2013 370, 1999.", "title": "Bottom-up computation of sparse and iceberg cubes", "journal": "", "author": ["K S Beyer", "R Ramakrishnan"], "volume": "", "pages": "359--370"}, {"raw_string": "S. Geffner, D. Agrawal, A. E. Abbadi, and T. R. Smith. Rel- ative pre\ufb01x sums: An ef\ufb01cient approach for querying dy- namic olap data cubes. In ICDE 1999, pages 328\u2013335, 1999.", "title": "Rel- ative pre\ufb01x sums: An ef\ufb01cient approach for querying dy- namic olap data cubes", "journal": "", "author": ["S Geffner", "D Agrawal", "A E Abbadi", "T R Smith"], "volume": "", "pages": "328--335"}, {"raw_string": "P. B. Gibbons and Y. Matias. Synopsis data structures for massive data sets. SODA 1999, pages 909\u2013910, 1999.", "title": "Synopsis data structures for massive data sets", "journal": "SODA", "author": ["P B Gibbons", "Y Matias"], "volume": "", "pages": "909--910"}, {"raw_string": "J. Gray, A. Bosworth, A. Layman, and H. Pirahesh. Data cube: A relational aggregation operator generalizing group- by, cross-tab, and sub-total. In ICDE 1996, pages 152\u2013159, 1996.", "title": "Data cube: A relational aggregation operator generalizing group- by, cross-tab, and sub-total", "journal": "", "author": ["J Gray", "A Bosworth", "A Layman", "H Pirahesh"], "volume": "", "pages": "152--159"}, {"raw_string": "D. Gunopulos, G. Kollios, V. J. Tsotras, and C. Domeniconi. Approximating multi-dimensional aggregate range queries over real attributes. In SIGMOD 2000, volume 29, pages 463\u2013474, 2000.", "title": "Approximating multi-dimensional aggregate range queries over real attributes", "journal": "", "author": ["D Gunopulos", "G Kollios", "V J Tsotras", "C Domeniconi"], "volume": "29", "pages": "463--474"}, {"raw_string": "B. R. Iyer and D. Wilhite. Data compression support in databases. In VLDB\u201994, pages 695\u2013704, 1994.", "title": "Data compression support in databases", "journal": "", "author": ["B R Iyer", "D Wilhite"], "volume": "", "pages": "695--704"}, {"raw_string": "S. Y. Lee, T. W. Ling, and H.-G. Li. Hierarchical compact cube for range-max queries. In VLDB 2000,, pages 232\u2013241, 2000.", "title": "Hierarchical compact cube for range-max queries", "journal": "", "author": ["S Y Lee", "T W Ling", "H-G Li"], "volume": "", "pages": "232--241"}, {"raw_string": "J. Li, D. Rotem, and J. Srivastava. Aggregation algorithms In VLDB\u201999, for very large compressed data warehouses. pages 651\u2013662, 1999.", "title": "Aggregation algorithms In VLDB\u201999, for very large compressed data warehouses", "journal": "", "author": ["J Li", "D Rotem", "J Srivastava"], "volume": "", "pages": "651--662"}, {"raw_string": "V. Poosala and V. Ganti. Fast approximate answers to ag- gregate queries on a data cube. SSDBM 1999, pages 24\u201333, 1999.", "title": "Fast approximate answers to ag- gregate queries on a data cube", "journal": "SSDBM", "author": ["V Poosala", "V Ganti"], "volume": "", "pages": "24--33"}, {"raw_string": "K. A. Ross and D. Srivastava. Fast computation of sparse datacubes. In VLDB\u201997, pages 116\u2013185, 1997.", "title": "Fast computation of sparse datacubes", "journal": "", "author": ["K A Ross", "D Srivastava"], "volume": "", "pages": "116--185"}, {"raw_string": "K. A. Ross and K. A. Zaman. Serving datacube tuples from main memory. SSDBM 2000, pages 182\u2013195, 2000.", "title": "Serving datacube tuples from main memory", "journal": "SSDBM", "author": ["K A Ross", "K A Zaman"], "volume": "2000", "pages": "pages "}, {"raw_string": "J. Shanmugasundaram, U. M. Fayyad, and P. S. Bradley. Compressed data cubes for olap aggregate query approxi- mation on continuous dimensions. SIGKDD 1999, pages 223\u2013232, 1999.", "title": "Compressed data cubes for olap aggregate query approxi- mation on continuous dimensions", "journal": "SIGKDD", "author": ["J Shanmugasundaram", "U M Fayyad", "P S Bradley"], "volume": "", "pages": "223--232"}, {"raw_string": "J. S. Vitter, M. Wang, and B. R. Iyer. Data cube approx- In CIKM98, pages imation and histograms via wavelets. 96\u2013104, 1998.", "title": "Data cube approx- imation and histograms via wavelets", "journal": "", "author": ["J S Vitter", "M Wang", "B R Iyer"], "volume": "", "pages": "pages "}, {"raw_string": "H. K. T. Wong, H.-F. Liu, F. Olken, D. Rotem, and L. Wong. Bit transposed \ufb01les. In VLDB\u201985, pages 448\u2013457, 1985.", "title": "Bit transposed \ufb01les", "journal": "", "author": ["H K T Wong", "H-F Liu", "F Olken", "D Rotem", "L Wong"], "volume": "", "pages": "448--457"}, {"raw_string": "Y. Zhao, P. Deshpande, and J. F. Naughton. An array-based algorithm for simultaneous multidimensional aggregates. In SIGMOD 1997, pages 159\u2013170, 1997. Proceedings of the 18th International Conference on Data Engineering (ICDE(cid:146)02) 1063-6382/02 $17.00 ' 2002 IEEE Authorized licensed use limited to: SUN YAT-SEN UNIVERSITY. Downloaded on April 6, 2009 at 03:26 from IEEE Xplore. Restrictions apply.", "title": "An array-based algorithm for simultaneous multidimensional aggregates. Proceedings of the 18th International Conference on Data Engineering (ICDE(cid:146)02) 1063-6382/02 $17.00 ' 2002 IEEE Authorized licensed use limited to", "journal": "SUN YAT-SEN UNIVERSITY. Downloaded on April 6, 2009 at 03:26 from IEEE Xplore. Restrictions apply", "author": ["Y Zhao", "P Deshpande", "J F Naughton"], "volume": "", "pages": "159--170"}]]
    
    
    var newNodes=[];
    var newEdges=[];
    var value = info[0];
    newNodes.push(
      { 
        group: "nodes", 
        data: { 
          id: value["title"], 
          Journal: "journal"
        }, 
      },
    );
    for(var i=1;i<info[1].length;i++){
      value = info[1][i];
      newNodes.push(
        { 
          group: "nodes", 
          data: { 
            id: value["title"], 
            Journal: value["journal"],
          }, 
        },
      );
      newEdges.push(
        { 
          group: "edges", 
          data: { 
            id:i,
            source: info[0].title, 
            target: value["title"],
          }, 
        },
      );
    }
    
    this.cy.add(newNodes);
    this.cy.add(newEdges);

    this.cy.nodes().style({"text-max-width":'35'});
    this.cy.nodes().style({"text-wrap": "ellipsis"});
    
    var layout = this.cy.layout({ name: 'cose' }); //concentric, cose, circle

    layout.run();
    /*cy.viewport({
      zoom:2,
      pan: { x: 10, y: 10 }
    });*/
  }
}
