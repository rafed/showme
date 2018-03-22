import { GenerateGraphService } from "../app/service/generate-graph.service";

export class PDFGetter {
    constructor (private generateGraphService: GenerateGraphService) {}
    public getPDFLink(title,author) {
       // console.log("Call");
        this.generateGraphService.getPDF(title,author);
    }
}