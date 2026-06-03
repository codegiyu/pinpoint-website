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
import { CheckCircle2, Upload, XCircle } from 'lucide-react';
import { GhostBtn } from './GhostBtn';
import { formatFileSize } from '@/lib/utils/general';
import { cn } from '@/lib/utils';

export interface FileUploadInputProps {
  label?: string;
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  inputProps?: Omit<ComponentPropsWithoutRef<'input'>, 'className' | 'onChange' | 'type'>;
}

const MAX_FILESIZE = 5 * 1024 * 1024; // 5mb;
const MAX_FILES = 10;

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

  const mergeIncomingFiles = (prev: File[], incoming: File[]): File[] => {
    if (!incoming.length) return prev;

    if (prev.length >= MAX_FILES) {
      toast({ description: `You can attach at most ${MAX_FILES} files.`, variant: 'error' });
      return prev;
    }

    const ACCEPTED_FILE_TYPES = new Set(acceptedFileTypesArr);
    const next = [...prev];

    for (let i = 0; i < incoming.length; i++) {
      const file = incoming[i];

      if (next.length >= MAX_FILES) {
        if (i < incoming.length) {
          toast({ description: `You can attach at most ${MAX_FILES} files.`, variant: 'error' });
        }
        break;
      }

      const fileType = file?.type ?? '';
      const fileSize = file?.size ?? 0;

      if (fileSize > MAX_FILESIZE) {
        toast({ description: `${file.name}: file is greater than 5mb.`, variant: 'error' });
        continue;
      }

      if (ACCEPTED_FILE_TYPES.size && !ACCEPTED_FILE_TYPES.has(fileType.toLowerCase())) {
        toast({
          description: `${file.name}: file type ${fileType || '(unknown)'} is not accepted.`,
          variant: 'error',
        });
        continue;
      }

      next.push(file);
    }

    return next;
  };

  const onFileSelect = (fileList: FileList | null) => {
    if (!fileList?.length) return;
    const incoming = Array.from(fileList);
    setFiles(prev => mergeIncomingFiles(prev, incoming));
    if (inputRef.current) inputRef.current.value = '';
  };

  const removeFileFromList = (index: number) => {
    setFiles(prev => prev.filter((_, idx) => idx != index));
  };

  const handleFileDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files ?? []);
    if (!dropped.length) return;
    setFiles(prev => mergeIncomingFiles(prev, dropped));
  };

  const openFilePicker = () => {
    if (files.length >= MAX_FILES) {
      toast({ description: `You can attach at most ${MAX_FILES} files.`, variant: 'error' });
      return;
    }
    inputRef.current?.click();
  };

  return (
    <div className="w-full">
      {label ? (
        <span
          className={cn(
            'text-[0.825rem] lg:text-[0.95rem] leading-[1.2] font-extralight text-gray-66 transition-all ease-linear duration-300 mb-2 block',
            files.length
              ? 'transform-y-0 transform-x-0 opacity-100'
              : 'transform-y-2 transform-x-2 opacity-0'
          )}>
          {label}
          {inputProps?.required ? ' *' : ''}
        </span>
      ) : null}
      <div className="relative w-full">
        <input
          {...inputProps}
          type="file"
          multiple
          tabIndex={-1}
          className="sr-only"
          ref={inputRef}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onFileSelect(e.target.files)}
        />
        <div
          className="w-full grid grid-cols-[1fr_auto] gap-5 border border-dark/25 py-6 px-4"
          onDragOver={e => e.preventDefault()}
          onDrop={handleFileDrop}>
          <div className="w-full min-w-0">
            {!files.length ? (
              <button
                type="button"
                className="typo-body-4 text-gray-66 text-left w-full"
                onClick={openFilePicker}>
                {label}
                {inputProps?.required ? ' *' : ''}
              </button>
            ) : (
              <div className="w-full grid gap-1">
                {files.map((file, idx) => (
                  <FileDisplay
                    key={`${file.name}-${file.size}-${file.lastModified}-${idx}`}
                    file={file}
                    removeFile={() => removeFileFromList(idx)}
                  />
                ))}
              </div>
            )}
          </div>
          <button
            type="button"
            className="grid place-items-center shrink-0 text-dark/75 hover:text-dark transition-colors disabled:opacity-40 disabled:pointer-events-none"
            aria-label="Add files"
            disabled={files.length >= MAX_FILES}
            onClick={openFilePicker}>
            <Upload className="size-6 stroke-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

const FileDisplay = ({ file, removeFile }: { file: File; removeFile: () => void }) => {
  // TODO: Create utility function to take in file.size and return the object on the right
  const { filesize, unit } = formatFileSize(file.size);

  return (
    <div className="w-full bg-gray-f2 grid items-center grid-cols-[auto_1fr_auto_auto] gap-4 border-b-2 border-dark px-2 py-2">
      <CheckCircle2 className="size-4 text-dark" />
      <p className="typo-body-4 text-gray-66 truncate text-start">{file.name}</p>
      <p className="typo-body-4 text-gray-66">
        <span className="font-medium text-dark">{filesize}</span> {unit}
      </p>
      <GhostBtn
        type="button"
        className="w-full shrink-0"
        LucideIcon={XCircle}
        iconClass="size-4 text-dark"
        onClick={removeFile}
      />
    </div>
  );
};
