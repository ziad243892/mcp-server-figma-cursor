import { Component } from '@angular/core';

/**
 * Upload Showcase Component
 * Displays all upload component variants for testing
 */
@Component({
  selector: 'alk-upload-showcase',
  templateUrl: './upload-showcase.component.html',
  styleUrls: ['./upload-showcase.component.scss'],
  standalone: false
})
export class UploadShowcaseComponent {
  // RTL toggle
  rtl: boolean = false;
  
  // Disabled state toggle
  disabled: boolean = false;
  
  // Show helper text toggle
  showHelperText: boolean = true;
  
  // Selected files
  selectedFiles: File[] = [];
  
  toggleRtl(): void {
    this.rtl = !this.rtl;
  }
  
  toggleDisabled(): void {
    this.disabled = !this.disabled;
  }
  
  toggleHelperText(): void {
    this.showHelperText = !this.showHelperText;
  }
  
  onFilesSelected(files: File[]): void {
    this.selectedFiles = files;
    console.log('Files selected:', files);
  }
  
  onFilesDropped(files: File[]): void {
    this.selectedFiles = files;
    console.log('Files dropped:', files);
  }
  
  onError(error: string): void {
    console.error('Upload error:', error);
    alert(error);
  }
  
  clearFiles(): void {
    this.selectedFiles = [];
  }
  
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }
}

