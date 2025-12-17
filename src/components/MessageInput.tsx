import { useState } from 'react';
import { socket } from '../services/socket';
import { useChatStore } from '@/store/chat.store';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import EmojiPicker from 'emoji-picker-react';
import { Smile, Image as ImageIcon } from 'lucide-react';

export default function MessageInput() {
  const room = useChatStore((state) => state.room);
  const MAX_SIZE = 800 * 1024;
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  function sendText() {
    if (!message.trim()) return;

    socket.emit('send-message', {
      room,
      content: message,
    });

    setMessage('');
    setShowEmoji(false);
  }

  function compressImage(file: File): Promise<File> {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = () => {
        img.src = reader.result as string;
      };

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1024;

        const scale = Math.min(1, MAX_WIDTH / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            resolve(new File([blob!], file.name, { type: 'image/jpeg' }));
          },
          'image/jpeg',
          0.7,
        );
      };

      reader.readAsDataURL(file);
    });
  }


async function sendImage(file: File) {
  const compressed = await compressImage(file);

  const reader = new FileReader();

  reader.onload = () => {
    socket.emit('send-message', {
      room,
      imageUrl: reader.result as string,
    });
  };

  reader.readAsDataURL(compressed);
}


  function resetImage() {
    setSelectedImage(null);
    setPreview(null);
  }

  return (
    <>
      <div className="relative p-3 flex gap-2 items-center border-t bg-background">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setShowEmoji((v) => !v)}
        >
          <Smile size={18} />
        </Button>

        {showEmoji && (
          <div className="absolute bottom-14 left-3 z-50">
            <EmojiPicker
              onEmojiClick={(emoji) =>
                setMessage((prev) => prev + emoji.emoji)
              }
            />
          </div>
        )}

        <Input
          placeholder="Digite sua mensagem..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendText()}
        />

        <label className="cursor-pointer flex items-center">
          <ImageIcon size={18} />
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              if (file.size > MAX_SIZE) {
                alert('Imagem muito grande (máx 800KB)');
                return;
              }

              setSelectedImage(file);
              setPreview(URL.createObjectURL(file));
            }}
          />
        </label>

        <Button onClick={sendText}>Enviar</Button>
      </div>

      <Dialog
        open={!!selectedImage}
        onOpenChange={(open) => {
          if (!open) resetImage();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enviar imagem?</DialogTitle>
          </DialogHeader>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="rounded-lg max-h-96 mx-auto object-contain"
            />
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={resetImage}>
              Cancelar
            </Button>

            <Button
              onClick={() => {
                if (!selectedImage) return;
                sendImage(selectedImage);
                resetImage();
              }}
            >
              Enviar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
