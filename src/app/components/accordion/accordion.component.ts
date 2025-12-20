import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Accordion component matching Figma design system
 * Supports expand/collapse, RTL, icon alignment, and multiple sizes
 */
@Component({
  selector: 'alk-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  standalone: false
})
export class AccordionComponent {
  // Title content
  @Input() titleEn: string = 'Accordion Title';
  @Input() titleAr: string = 'عنوان الأكورديون';
  
  // RTL support
  @Input() rtl: boolean = false;
  
  // Expanded state
  @Input() expanded: boolean = false;
  @Output() expandedChange = new EventEmitter<boolean>();
  
  // Icon alignment: Leading (left in LTR, right in RTL) or Trailing (right in LTR, left in RTL)
  @Input() iconAlignment: 'Leading' | 'Trailing' = 'Trailing';
  
  // Size variants
  @Input() size: 'Large' | 'Medium' | 'Small' = 'Large';
  
  /**
   * Toggle expanded state
   */
  toggle(): void {
    this.expanded = !this.expanded;
    this.expandedChange.emit(this.expanded);
  }
  
  /**
   * Get the display title based on RTL setting
   */
  getDisplayTitle(): string {
    return this.rtl ? this.titleAr : this.titleEn;
  }
  
  /**
   * Get CSS classes for the accordion header
   */
  getHeaderClasses(): string {
    const classes: string[] = ['alk-accordion__header'];
    classes.push(`alk-accordion__header--${this.size.toLowerCase()}`);
    if (this.rtl) {
      classes.push('alk-accordion__header--rtl');
    }
    if (this.iconAlignment === 'Leading') {
      classes.push('alk-accordion__header--icon-leading');
    } else {
      classes.push('alk-accordion__header--icon-trailing');
    }
    return classes.join(' ');
  }
  
  /**
   * Get CSS classes for the accordion body
   */
  getBodyClasses(): string {
    const classes: string[] = ['alk-accordion__body'];
    if (this.rtl) {
      classes.push('alk-accordion__body--rtl');
    }
    return classes.join(' ');
  }
  
  /**
   * Get icon rotation class based on expanded state
   */
  getIconClasses(): string {
    const classes: string[] = ['alk-accordion__icon'];
    if (this.expanded) {
      classes.push('alk-accordion__icon--expanded');
    }
    return classes.join(' ');
  }
}

