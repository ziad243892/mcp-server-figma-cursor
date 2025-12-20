import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

/**
 * Upload/DropZone component matching Figma design system
 * Supports drag-and-drop, file selection, RTL, and disabled states
 */
@Component({
  selector: 'alk-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  standalone: false
})
export class UploadComponent {
  // Text content
  @Input() mainTextEn: string = 'Drag and drop files here to upload';
  @Input() mainTextAr: string = 'اسحب و أفلت الملفات هنا للرفع';
  @Input() helperTextEn: string = 'Maximum file size allowed is 2MB, supported file formats include .jpg, .png, and .pdf.';
  @Input() helperTextAr: string = 'الحد الأقصى لحجم الملف المسموح به هو 2 ميجابايت، وتشمل الصيغ المدعومة .jpg و .png و .pdf.';
  @Input() browseButtonTextEn: string = 'Browse Files';
  @Input() browseButtonTextAr: string = 'تصفح الملفات';
  
  // Component state
  @Input() showHelperText: boolean = true;
  @Input() disabled: boolean = false;
  @Input() rtl: boolean = false;
  
  // File handling
  @Input() accept: string = '.jpg,.png,.pdf';
  @Input() maxSize: number = 2 * 1024 * 1024; // 2MB in bytes
  
  // Events
  @Output() filesSelected = new EventEmitter<File[]>();
  @Output() filesDropped = new EventEmitter<File[]>();
  @Output() error = new EventEmitter<string>();
  
  // Internal state
  isDragging: boolean = false;
  
  /**
   * Get the display text based on RTL setting
   */
  getMainText(): string {
    return this.rtl ? this.mainTextAr : this.mainTextEn;
  }
  
  getHelperText(): string {
    return this.rtl ? this.helperTextAr : this.helperTextEn;
  }
  
  getBrowseButtonText(): string {
    return this.rtl ? this.browseButtonTextAr : this.browseButtonTextEn;
  }
  
  /**
   * Handle file selection from input
   */
  onFileSelected(event: Event): void {
    if (this.disabled) return;
    
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processFiles(Array.from(input.files));
    }
  }
  
  /**
   * Handle drag over event
   */
  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    if (this.disabled) return;
    
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }
  
  /**
   * Handle drag leave event
   */
  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent): void {
    if (this.disabled) return;
    
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }
  
  /**
   * Handle drop event
   */
  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    if (this.disabled) return;
    
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.processFiles(Array.from(event.dataTransfer.files));
      this.filesDropped.emit(Array.from(event.dataTransfer.files));
    }
  }
  
  /**
   * Process and validate files
   */
  private processFiles(files: File[]): void {
    const validFiles: File[] = [];
    const errors: string[] = [];
    
    files.forEach(file => {
      // Check file size
      if (file.size > this.maxSize) {
        errors.push(`${file.name}: File size exceeds ${this.maxSize / (1024 * 1024)}MB limit`);
        return;
      }
      
      // Check file extension
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      const acceptedExtensions = this.accept.split(',').map(ext => ext.trim().toLowerCase());
      
      if (!acceptedExtensions.includes(fileExtension)) {
        errors.push(`${file.name}: File type not supported. Accepted types: ${this.accept}`);
        return;
      }
      
      validFiles.push(file);
    });
    
    if (errors.length > 0) {
      this.error.emit(errors.join('; '));
    }
    
    if (validFiles.length > 0) {
      this.filesSelected.emit(validFiles);
    }
  }
  
  /**
   * Trigger file input click
   */
  triggerFileInput(): void {
    if (this.disabled) return;
    
    const fileInput = document.getElementById('alk-upload-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
  
  /**
   * Get CSS classes for the container
   */
  getContainerClasses(): string {
    const classes: string[] = ['alk-upload'];
    
    if (this.disabled) {
      classes.push('alk-upload--disabled');
    }
    
    if (this.isDragging) {
      classes.push('alk-upload--dragging');
    }
    
    if (this.rtl) {
      classes.push('alk-upload--rtl');
    }
    
    return classes.join(' ');
  }
}

