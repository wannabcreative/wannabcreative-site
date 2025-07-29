import { useState, useRef } from "react";
import { Button } from "./button";
import { Card } from "./card";
import { Camera, Upload, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number;
  className?: string;
}

export function FileUpload({ 
  onFileSelect, 
  accept = "image/*", 
  maxSize = 5 * 1024 * 1024,
  className 
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    if (file.size > maxSize) {
      alert('파일 크기가 너무 큽니다. 5MB 이하의 파일을 선택해주세요.');
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className={cn(
      "bg-white/5 backdrop-blur-sm border-white/10 p-8",
      className
    )}>
      <div
        className={cn(
          "border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 group",
          isDragging ? "border-mystic-gold bg-mystic-gold/10" : "border-mystic-gold/50 hover:border-mystic-gold"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="mb-6">
          <div className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110",
            selectedFile ? "bg-green-500" : "mystic-gold-gradient"
          )}>
            {selectedFile ? (
              <Check className="text-3xl text-white" />
            ) : (
              <Camera className="text-3xl text-slate-900" />
            )}
          </div>
          
          <h3 className="text-2xl font-semibold mb-3 text-mystic-gold">
            {selectedFile ? "업로드 완료" : "손바닥 사진 업로드"}
          </h3>
          
          <p className="text-gray-300 mb-6">
            {selectedFile 
              ? `${selectedFile.name} (${(selectedFile.size / 1024 / 1024).toFixed(1)}MB)`
              : "손바닥을 펼쳐서 선명하게 촬영해주세요"
            }
          </p>
        </div>
        
        <Button 
          className="mystic-gold-gradient text-slate-900 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300 mb-4 inline-flex items-center space-x-2"
          type="button"
        >
          <Upload className="w-5 h-5" />
          <span>{selectedFile ? "다른 사진 선택" : "사진 선택하기"}</span>
        </Button>
        
        <div className="text-sm text-gray-400">
          또는 여기에 파일을 드래그하세요
        </div>
      </div>

      <div className="mt-6 text-left">
        <h4 className="font-semibold text-mystic-gold mb-3 flex items-center">
          <span className="w-4 h-4 bg-mystic-gold rounded-full mr-2"></span>
          촬영 가이드
        </h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-center">
            <Check className="w-4 h-4 text-mystic-emerald mr-2" />
            손바닥을 펼쳐서 촬영
          </li>
          <li className="flex items-center">
            <Check className="w-4 h-4 text-mystic-emerald mr-2" />
            충분한 조명 확보
          </li>
          <li className="flex items-center">
            <Check className="w-4 h-4 text-mystic-emerald mr-2" />
            손금이 선명하게 보이도록
          </li>
          <li className="flex items-center">
            <Check className="w-4 h-4 text-mystic-emerald mr-2" />
            흔들림 없이 안정적으로
          </li>
        </ul>
      </div>
    </Card>
  );
}
