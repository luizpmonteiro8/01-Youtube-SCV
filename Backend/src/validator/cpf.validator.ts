import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isCPF } from 'brazilian-values';

@ValidatorConstraint()
export class CPFValidation implements ValidatorConstraintInterface {
  validate(text: string) {
    return isCPF(text);
  }
}
