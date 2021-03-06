import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appDomChange]',
})
export class DomChangeDirective implements OnDestroy {
  private changes: MutationObserver;

  @Output()
  public domChange = new EventEmitter();

  constructor(private elementRef: ElementRef) {
    const element = this.elementRef.nativeElement;

    console.log('xxx');

    this.changes = new MutationObserver((mutations: MutationRecord[]) => {
      mutations.forEach((mutation: MutationRecord) =>
        this.domChange.emit(mutation)
      );
    });

    this.changes.observe(element, {
      childList: true,
    });
  }
  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
