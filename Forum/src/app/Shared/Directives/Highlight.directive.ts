import {Directive, ElementRef, HostListener} from "@angular/core";

@Directive({
  selector: '[appHighlight]'
})

export class HighlightDirective{

  myElement: ElementRef;

  constructor(_myElement: ElementRef) {
    this.myElement = _myElement;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlightAction("rgba(120,157,218,0.3)")
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlightAction("none");
  }

  private highlightAction(color: string) {
    this.myElement.nativeElement.style = `background-color: ${color}; border-radius: 0.3cm`;
  }
}
