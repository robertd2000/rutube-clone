import { TextareaHTMLAttributes } from 'react'

import { IFieldProps } from '../field/Field.interface'

type TypeInputPropsField = TextareaHTMLAttributes<HTMLTextAreaElement> &
	IFieldProps

export interface ITextArea extends TypeInputPropsField {}
