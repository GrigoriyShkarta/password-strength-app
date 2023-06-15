import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

enum PasswordStrength {
  Easy,
  Medium,
  Strong
}

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.css']
})
export class PasswordStrengthComponent {
  passwordControl: FormControl = new FormControl('');
  passwordStrengthClasses: string[] = Array(3).fill('gray');

  constructor() {
    this.passwordControl.valueChanges.subscribe((value) => {
      this.calculatePasswordStrength(value);
    });
  }

  calculatePasswordStrength(password: string) {
    if (password.length === 0) {
      this.passwordStrengthClasses.fill('gray');
    } else if (password.length < 8) {
      this.passwordStrengthClasses.fill('red');
    } else {
      const passwordStrength = this.getPasswordStrength(password);
      this.updatePasswordStrengthClasses(passwordStrength);
    }
  }

  getPasswordStrength(password: string): PasswordStrength {
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[!@#$%^&*()]/.test(password);

    if (hasLetters && hasNumbers && hasSymbols) {
      return PasswordStrength.Strong;
    } else if ((hasLetters && hasSymbols) || (hasLetters && hasNumbers) || (hasNumbers && hasSymbols)) {
      return PasswordStrength.Medium;
    } else {
      return PasswordStrength.Easy;
    }
  }

  updatePasswordStrengthClasses(strength: PasswordStrength) {
    this.passwordStrengthClasses.fill('gray');

    if (strength === PasswordStrength.Easy) {
      this.passwordStrengthClasses[0] = 'red';
    } else if (strength === PasswordStrength.Medium) {
      this.passwordStrengthClasses[0] = 'yellow';
      this.passwordStrengthClasses[1] = 'yellow';
    } else if (strength === PasswordStrength.Strong) {
      this.passwordStrengthClasses.fill('green');
    }
  }
}
