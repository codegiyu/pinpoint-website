'use client';
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  Dispatch,
  DragEvent,
  SetStateAction,
  useMemo,
  useRef,
} from 'react';
import { toast } from './Toast';
import { CheckCircle2, Upload } from 'lucide-react';
import { GhostBtn } from './GhostBtn';
import { createFileList } from '@/lib/utils/general';
import { InputWrapper } from '../general/InputWrapper';

export interface FileUploadInputProps {
  label?: string;
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  inputProps?: Omit<ComponentPropsWithoutRef<'input'>, 'className' | 'onChange' | 'type'>;
}

const MAX_FILESIZE = 5 * 1024 * 1024; // 5mb;

export const FileUploadInput = ({
  label = 'Attach files',
  files,
  setFiles,
  inputProps,
}: FileUploadInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const acceptedFileTypesArr = useMemo(() => {
    return (inputProps?.accept ?? '').split(',').filter(item => !!item.trim());
  }, [inputProps]);

  const onFileSelect = async (files: FileList | null) => {
    if (!files) return;
    const ACCEPTED_FILE_TYPES = new Set(acceptedFileTypesArr);

    for (const file of files) {
      const fileType = file?.type ?? '';
      const fileSize = file?.size ?? 0;

      if (fileSize > MAX_FILESIZE) {
        toast({ description: 'File is greater than 5mb!', variant: 'error' });
        return;
      }

      if (ACCEPTED_FILE_TYPES.size && !ACCEPTED_FILE_TYPES.has(fileType.toLowerCase())) {
        toast({ description: 'Filetype ' + fileType + ' is not accepted!', variant: 'error' });
        return;
      }

      setFiles(prev => (prev ? [...prev, file] : [file]));
    }
  };

  const removeFileFromList = (index: number) => {
    setFiles(prev => prev.filter((_, idx) => idx != index));
  };

  // TODO: Please confirm that this works
  // As in it triggers the onChange function
  const handleFileDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const input = inputRef.current;

    // Optional: trigger file input change event manually if needed
    if (input) {
      const filesArray = [...Array.from(input.files ?? []), ...Array.from(e.dataTransfer.files)];
      input.files = createFileList(filesArray);
    }
  };

  return (
    <InputWrapper
      wrapClassName=""
      label={label}
      labelOnTop={!!files.length}
      required={inputProps?.required}
      otherLabelProps={{ onDrop: handleFileDrop }}>
      <>
        <div className="w-full grid grid-cols-[1fr_auto] gap-5 border border-dark/25 py-6 px-4">
          <div className="w-full">
            {!files.length ? (
              <span className="typo-body-4 text-gray-66">
                {label}
                {inputProps?.required ? ' *' : ''}
              </span>
            ) : (
              <div className="w-full grid gap-1">
                {files.map((file, idx) => (
                  <FileDisplay key={idx} file={file} removeFile={() => removeFileFromList(idx)} />
                ))}
              </div>
            )}
          </div>
          <Upload className="size-6 text-dark/75 stroke-1" />
        </div>
        <input
          type="file"
          className="w-[0.1px] h-[0.1px] absolute inset-0 z-[-1] overflow-hidden opacity-0"
          ref={inputRef}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onFileSelect(e.target.files)}
          {...inputProps}
        />
      </>
    </InputWrapper>
  );
};

const FileDisplay = ({ file, removeFile }: { file: File; removeFile: () => void }) => {
  // TODO: Create utility function to take in file.size and return the object on the right
  const { filesize, unit } = { filesize: file.size, unit: 'MB' };

  return (
    <GhostBtn type="button" className="w-full" onClick={removeFile}>
      <div className="w-full bg-gray-f2 grid items-center grid-cols-[auto_1fr_auto_auto] gap-4 border-b-2 border-dark px-2 py-2">
        <CheckCircle2 className="size-4 text-dark" />
        <p className="typo-body-4 text-gray-66 truncate">{file.name}</p>
        <p className="typo-body-4 text-gray-66">
          <span className="font-medium text-dark">{filesize}</span> {unit}
        </p>
      </div>
    </GhostBtn>
  );
};
