import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// Ξ Δ
@Component({
  selector: 'clydeui-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.less']
})
export class ModalWindowComponent implements OnInit {

  @Input() visible: boolean;
  @Input() buttons = [];
  @Input() title: String;
  @Input() content: SafeHtml;
  @Input('content')
    set _content(value: String) {
        const _content = value;
        this.setHtmlContent(_content);
    }
  @Input() width: number;
  marginTop: number;
  @Input() height: number;
//   set _height(value: number) {
//     const _height = value;
//     this.marginTop = value/2;

// }

  posX = String;

  constructor(private sanitizer: DomSanitizer) {

   }

  ngOnInit() {
  }

  setButtons () {

  }

  setHtmlContent(content) {
    this.content = this.sanitizer.bypassSecurityTrustHtml(content);
  }

  close() {
    this.visible = false;
  }
}
