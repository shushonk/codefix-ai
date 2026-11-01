import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, Loader2 } from 'lucide-react';
import { cn } from '../utils/ui';
import JSZip from 'jszip';

interface FileUploadProps {
  onUpload: (files: { path: string; content: string }[]) => void;
}

export default function FileUpload({ onUpload }: FileUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true);
    const results: { path: string; content: string }[] = [];

    try {
      for (const file of acceptedFiles) {
        if (file.name.endsWith('.zip')) {
          const zip = await JSZip.loadAsync(file);
          const zipFiles = Object.keys(zip.files);
          
          for (const path of zipFiles) {
            const zipEntry = zip.files[path];
            if (!zipEntry.dir) {
              const content = await zipEntry.async('string');
              results.push({ path, content });
            }
          }
        } else {
          const content = await file.text();
          results.push({ path: file.name, content });
        }
      }
      onUpload(results);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'application/zip': ['.zip'],
      'text/plain': ['.txt', '.py', '.js', '.ts', '.tsx', '.java', '.go', '.cpp', '.h']
    }
  });

  return (
    <div 
      {...getRootProps()} 
      className={cn(
        "border-2 border-dashed rounded-2xl p-12 transition-all cursor-pointer flex flex-col items-center justify-center gap-4",
        isDragActive ? "border-purple-500 bg-purple-500/5" : "border-slate-800 hover:border-slate-700 bg-slate-900/20"
      )}
    >
      <input {...getInputProps()} />
      <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-500">
        {isUploading ? <Loader2 className="w-8 h-8 animate-spin" /> : <Upload className="w-8 h-8" />}
      </div>
      <div className="text-center">
        <h4 className="text-lg font-bold mb-1">Upload Source Files</h4>
        <p className="text-sm text-slate-500 max-w-xs">
          Drag and drop individual files or a ZIP archive of your project.
        </p>
      </div>
      <div className="flex items-center gap-4 mt-2">
         <span className="text-[10px] uppercase font-bold tracking-widest text-slate-600">Supported: Python, JS, TS, Java, Go, ZIP</span>
      </div>
    </div>
  );
}
