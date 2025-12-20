import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

/**
 * Button component matching Figma design system
 * Supports multiple color variants, sizes, styles, and RTL
 */
@Component({
  selector: 'alk-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: false
})
export class ButtonComponent {
  @ViewChild('defaultLeftIcon') defaultLeftIcon!: TemplateRef<any>;
  @ViewChild('defaultRightIcon') defaultRightIcon!: TemplateRef<any>;
  // Color variants from Figma
  @Input() color: 'teal' | 'red-brown' | 'navy' | 'steel-blue' | 'muted-indigo' = 'teal';
  
  // Size variants
  @Input() size: 'Large' | 'Medium' | 'Small' = 'Large';
  
  // Style variants: filled (solid background), outlined (border only), transparent (text only)
  @Input() variant: 'filled' | 'outlined' | 'transparent' = 'filled';
  
  // RTL support
  @Input() rtl: boolean = false;
  
  // Text content
  @Input() textEn: string = 'Button';
  @Input() textAr: string = 'إجراء';
  
  // Icon support
  @Input() showLeftIcon: boolean = false;
  @Input() showRightIcon: boolean = false;
  @Input() leftIcon?: TemplateRef<any>;
  @Input() rightIcon?: TemplateRef<any>;
  
  // Button state
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  
  // Show text (can be hidden for icon-only buttons)
  @Input() showText: boolean = true;
  
  /**
   * Get the CSS class for the button based on all inputs
   */
  getButtonClasses(): string {
    const classes: string[] = ['alk-button'];
    
    // Size class
    classes.push(`alk-button--${this.size.toLowerCase()}`);
    
    // Color class
    classes.push(`alk-button--${this.color.replace('-', '-')}`);
    
    // Variant class
    classes.push(`alk-button--${this.variant}`);
    
    // RTL class
    if (this.rtl) {
      classes.push('alk-button--rtl');
    }
    
    // Disabled class
    if (this.disabled) {
      classes.push('alk-button--disabled');
    }
    
    return classes.join(' ');
  }
  
  /**
   * Get the text to display based on RTL setting
   */
  getDisplayText(): string {
    return this.rtl ? this.textAr : this.textEn;
  }
  
  /**
   * Get icon size based on button size
   */
  getIconSize(): string {
    switch (this.size) {
      case 'Large':
        return '24px';
      case 'Medium':
        return '20px';
      case 'Small':
        return '16px';
      default:
        return '20px';
    }
  }
}
