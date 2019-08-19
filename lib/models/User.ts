import { hashSync, genSaltSync } from 'bcrypt'
import { Document, Schema, Model, HookNextFunction, model } from 'mongoose'
import { IUser } from '../interfaces/IUser'

export interface IUserModel extends IUser, Document {
  passwordHash?: string
  _password?: string
  _passwordConfirmation?: string
}

export const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true }
})

userSchema.virtual('password')
  .set(function setPassword(plaintext: string): void {
    this._password = plaintext
  })

userSchema.virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(plaintext: string): void {
    this._passwordConfirmation = plaintext
  })

userSchema.pre<IUserModel>('validate', function validatePasswords(next: HookNextFunction): void {
  if(!this._password) this.invalidate('password', 'Password is required')
  if(!this._passwordConfirmation) this.invalidate('passwordConfirmation', 'Password confirmation is required')
  if(this._password !== this._passwordConfirmation) {
    this.invalidate('passwordConfirmation', 'Passwords do not match')
  }

  if(this._password) this.set('passwordHash', hashSync(this._password, genSaltSync(8)))

  next()
})

export const User: Model<IUserModel> = model<IUserModel>('User', userSchema)
