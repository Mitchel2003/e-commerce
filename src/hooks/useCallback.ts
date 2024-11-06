import { UseCallbackProps } from '@/interfaces/props.interface'
import { useCallback, ChangeEvent } from 'react'

export default (props: UseCallbackProps) => {
  if (!props) return;
  const { field, setPreview } = props

  //handler to process a file input
  const handler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    processFile(file)
  }, [field])

  //handler to remove a file input
  const remove = useCallback(() => {
    setPreview(null)
    field.onChange(null)
  }, [field])

  //process file and set the preview
  const processFile = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
      field.onChange(file)
    }
    reader.readAsDataURL(file)
  }

  return { handler, remove }
}