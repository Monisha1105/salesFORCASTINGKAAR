
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';



export interface SalesForecastResponse{
  imageData: string;
}
@Component({
  selector: 'app-sales-forecast',
  templateUrl: './sales-forecast.component.html',
  styleUrls: ['./sales-forecast.component.css']
})


export class SalesForecastComponent implements OnInit {
  selectedFile: File;
  public timePeriod: string;
  progress: number;
  imageSrc: string;
  public imageData: string ;
 


  constructor(private http: HttpClient) {
    
   }


  ngOnInit() {
    console.log(this.timePeriod);
  }

  onFileSelected(event: { target: any; }) {
    this.selectedFile = <File>event.target.files[0];
  }
  onChange(event) {
    const selectedValue = event.target.value;
    this.timePeriod = selectedValue; // change the value of timePeriod to 6 if the selected option has a value of 6
    
  }

  onUpload() {
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    fd.append('timePeriod',this.timePeriod);
    setTimeout(() => {
      // Create new image element and set its source to my_plot.png
      const img = document.createElement('img');
      img.src = 'my_plot.png';
      
      // Append the new image element to the container
      const container = document.getElementById('image-container');
      container.appendChild(img);
    }, 5000); 
    
    console.log("Selected option: "+ this.timePeriod); 
    this.http.post<SalesForecastComponent>('http://localhost:5000/sales-forcast',fd,{ reportProgress: true, observe: 'events'
    }).subscribe((data:any) =>{
        this.imageSrc = 'data:image/png;base64,' + data.imgData;
      
    });
    
    this.http.post('http://localhost:5000/sales-forecast', fd, {
      reportProgress: true,
      observe: 'events'
    })

    .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
        
      } 
    });
  }
  onTimePeriodChange() {
      console.log('Selected time period:', this.timePeriod);
      // You can add more code here to update the timePeriod property or perform any other actions
    }
  
}