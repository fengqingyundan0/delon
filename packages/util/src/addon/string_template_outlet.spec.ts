import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelonUtilModule } from '../util.module';

describe('utils: string_template_outlet', () => {
  let fixture: ComponentFixture<TestComponent>;
  let dl: DebugElement;
  let context: TestComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [DelonUtilModule],
      declarations: [TestComponent]
    }).createComponent(TestComponent);
    dl = fixture.debugElement;
    context = fixture.componentInstance;
  });

  function check(str: string): void {
    const res = (dl.nativeElement as HTMLElement).textContent.trim();
    expect(res).toBe(str);
  }

  it('should be value is string', () => {
    context.value = 'a';
    fixture.detectChanges();
    check('a');
  });

  it('should be value is templateRef', () => {
    fixture.detectChanges();
    context.value = context.tpl1;
    fixture.detectChanges();
    check('tpl1');
  });

  it('should be null value', () => {
    context.value = null;
    fixture.detectChanges();
    check('');
  });

  it('should be undefined value', () => {
    context.value = undefined;
    fixture.detectChanges();
    check('');
  });

  it('should be string -> templateRef -> null', () => {
    context.value = 'asdf';
    fixture.detectChanges();
    check('asdf');
    context.value = context.tpl2;
    fixture.detectChanges();
    check('tpl2');
    context.value = null;
    fixture.detectChanges();
    check('');
  });

  it('should be null -> string -> templateRef', () => {
    context.value = null;
    fixture.detectChanges();
    check('');
    context.value = 'asdf';
    fixture.detectChanges();
    check('asdf');
    context.value = context.tpl1;
    fixture.detectChanges();
    check('tpl1');
  });
});

@Component({
  template: `
    <ng-template #tpl1>tpl1</ng-template>
    <ng-template #tpl2>tpl2</ng-template>
    <ng-container *stringTemplateOutlet="value">{{value}}</ng-container>
  `
})
class TestComponent {
  @ViewChild('tpl1') tpl1: TemplateRef<void>;
  @ViewChild('tpl2') tpl2: TemplateRef<void>;
  value: string | TemplateRef<void>;
}
