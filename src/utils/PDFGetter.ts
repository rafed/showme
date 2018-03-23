import { GenerateGraphService } from "../app/service/generate-graph.service";
export class PDFGetter {
    constructor (private generateGraphService: GenerateGraphService) {}
    public getPDFLink(title,author) {
       // console.log("Call");
        this.generateGraphService.getPDFLink(title,author)
        .subscribe(
        res => {
            if(res['msg']=='success'){
                window.open(res['pdflink'], "_blank");
            }
            else {
                if(res['sitelink'])
                    window.open(res['sitelink'], "_blank");
                else
                    alert("Site Link or PDF Not Found")
            }
        });
    }
}