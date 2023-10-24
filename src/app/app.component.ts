// app.component.ts
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('imageCanvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
  }

  onFileSelected(event: Event) {
    const files = (event.target as HTMLInputElement);
    const file = files.files != null ? files.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
          this.ctx.drawImage(img, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  logPixelColor(event: MouseEvent) {
    const x = event.offsetX;
    const y = event.offsetY;

    const pixel = this.ctx.getImageData(x, y, 1, 1).data;
    const [r, g, b, a] = pixel; // RGBA values

    console.log(`R: ${r}, G: ${g}, B: ${b}, A: ${a}`);
  }
}
