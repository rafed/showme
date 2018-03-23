import { GenerateGraphService } from "../app/service/generate-graph.service";
export class PDFGetter {
    constructor (private generateGraphService: GenerateGraphService) {}
    public getPDFLink(title,author) {
       // console.log("Call");
        this.generateGraphService.getPDFLink(title,author)
        .subscribe(
        res => {
            if(res['msg']=='success')
                window.open(res['pdflink'], "_blank");
            else 
                alert("PDF not available");
        });
    }

    public downloadPDF(title,author) {
        console.log("Call");
        var link = document.createElement('a');
        link.style.display='none';
        document.getElementsByTagName('body')[0].appendChild(link);
       // console.log('prob');
        this.generateGraphService.getPDFLink(title,author)
        .subscribe(
        res => {
            if(res['msg']=='success'){
                link.href = res['pdflink'];
                link.download = title +'.pdf';
                link.click();     
                console.log('click korechi')        
            }
            else 
                alert("PDF not available");
         });
     }
}