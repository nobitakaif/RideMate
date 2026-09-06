import { Upload } from 'lucide-react';
import React, { useRef, useState } from 'react';

export default function PhotoUpload({ text } : {text : string}) {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState(null);

  const handleDivClick = () => {
    if(!fileInputRef.current) return 
    fileInputRef.current?.click();
  };

  const handleFileChange = (e : any) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div onClick={handleDivClick} className="p-3 border border-dashed h-30 flex justify-center items-center text-sm flex-col rounded-lg cursor-pointer">
        <Upload/>
       {!fileName ? `upload ${text}` : `${fileName}`}
      
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className='hidden'
      />
    </div>
  );
}   