import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { useEffect, useRef } from 'react';

interface TinyEditorProps {
  value: string;
  handleContent: (content: string) => void;
}

const editor_api: string = import.meta.env.VITE_EDITOR_API_KEY;

export const TinyEditor = ({ value, handleContent }: TinyEditorProps) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  useEffect(() => {
    const handleEditorInit = (editor: TinyMCEEditor | null) => {
      editorRef.current = editor;
    };

    if (editorRef.current) {
      handleEditorInit(editorRef.current);
    }
  }, []);

  return (
    <Editor
      apiKey={editor_api}
      value={value}
      onInit={(_, editor) => (editorRef.current = editor)}
      onEditorChange={(content) => {
        handleContent(content);
      }}
      init={{
        placeholder: '내용을 입력하세요',
        language: 'ko_KR',
        menubar: false,
        height: 300,
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'preview',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'code',
          'save',
        ],
        toolbar:
          'formatselect fontselect fontsizeselect |' +
          ' forecolor backcolor |' +
          ' bold italic underline strikethrough |' +
          ' alignjustify alignleft aligncenter alignright |' +
          ' bullist numlist |' +
          ' table tabledelete |' +
          ' link custom_image',
        fontsize_formats: '9px 10px 11px 12px 13px 14px 15px 16px 18px 20px 22px 24px 28px 32px 36px 48px',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      }}
    />
  );
};
