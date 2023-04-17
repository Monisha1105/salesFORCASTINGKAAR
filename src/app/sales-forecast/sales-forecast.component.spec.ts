import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

import { SalesForecastComponent } from './sales-forecast.component';

describe('SalesForecastComponent', () => {
  let component: SalesForecastComponent;
  let fixture: ComponentFixture<SalesForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesForecastComponent ],
      imports: [ HttpClientTestingModule, FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial values for selectedFile, timePeriod and progress', () => {
    expect(component.selectedFile).toBeUndefined();
    expect(component.timePeriod).toEqual('month');
    expect(component.progress).toBeUndefined();
  });

  it('should set selectedFile when onFileSelected is called', () => {
    const file = new File([""], "test.csv");
    const event = { target: { files: [file] } };
    component.onFileSelected(event);
    expect(component.selectedFile).toEqual(file);
  });

  it('should make a post request when onUpload is called', () => {
    spyOn(component['http'], 'post').and.callThrough();
    component.selectedFile = new File([""], "test.csv");
    component.onUpload();
    expect(component['http'].post).toHaveBeenCalled();
  });
});
