import type { FormSchema } from '@/types/form-schema'

export const userFormSchema: FormSchema = {
  fields: [
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
    },
    {
      name: 'role',
      label: 'Perfil',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Usuário', value: 'user' },
      ],
    },
  ],
}