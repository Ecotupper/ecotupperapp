import React, { useState, useRef, useEffect } from 'react';
import { generateDescriptionFromImage } from '../../services/geminiService';
import { SparklesIcon } from '../common/Icon';

const PostItemView: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('1');
  const [pickupTime, setPickupTime] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageData, setImageData] = useState<{ base64: string; mimeType: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isCameraOpen && stream && videoRef.current) {
        videoRef.current.srcObject = stream;
    }
    // Cleanup stream on component unmount
    return () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [isCameraOpen, stream]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if(file.size > 4 * 1024 * 1024) { 
          setError("La imagen es demasiado grande. Máximo 4MB.");
          return;
      }
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        const base64Data = base64String.split(',')[1];
        setImageData({ base64: base64Data, mimeType: file.type });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenCamera = async () => {
    setError(null);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setStream(mediaStream);
        setIsCameraOpen(true);
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("No se pudo acceder a la cámara. Asegúrate de haber dado permiso.");
      }
    } else {
      setError("La cámara no es compatible con este navegador.");
    }
  };

  const handleCloseCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    setIsCameraOpen(false);
  };

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setImagePreview(dataUrl);
        const base64Data = dataUrl.split(',')[1];
        setImageData({ base64: base64Data, mimeType: 'image/jpeg' });
        handleCloseCamera();
      } else {
        setError("No se pudo capturar la imagen.");
      }
    }
  };

  const handleGenerateDescription = async () => {
    if (!imageData) {
      setError("Por favor, sube o toma una foto primero.");
      return;
    }
    setIsGenerating(true);
    setError(null);
    try {
      const result = await generateDescriptionFromImage(imageData.base64, imageData.mimeType);
      setTitle(result.title);
      setDescription(result.description);
      setTags(result.tags);
    } catch (e: any) {
      setError(e.message || "Ocurrió un error al generar la descripción.");
    } finally {
      setIsGenerating(false);
    }
  };
  
  const InputField: React.FC<{label: string, value: string, onChange: (val: string) => void, placeholder: string, type?: string}> = ({label, value, onChange, placeholder, type = 'text'}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input 
            type={type} 
            value={value} 
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verde-med focus:border-transparent transition"
        />
    </div>
  );

  return (
    <div className="p-4">
      {isCameraOpen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 flex justify-center items-center space-x-8">
                <button onClick={handleCloseCamera} className="text-white bg-gray-700/80 px-4 py-2 rounded-lg">Cancelar</button>
                <button onClick={handleCapture} className="w-20 h-20 bg-white rounded-full border-4 border-gray-400 p-1">
                    <div className="w-full h-full bg-white rounded-full ring-2 ring-inset ring-black"></div>
                </button>
            </div>
        </div>
      )}

      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Publicar un Excedente</h1>
        <p className="text-gray-600">Completa los detalles para que otros puedan rescatar tu comida.</p>
      </header>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Imagen del Producto</label>
          <div className="mt-1 flex justify-center items-center w-full aspect-video bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
            {imagePreview ? (
              <img src={imagePreview} alt="Previsualización" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-4">
                <p className="text-gray-500 mb-4">Sube una foto o tómala ahora</p>
                <div className="flex justify-center gap-4">
                    <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Subir Archivo</button>
                    <button onClick={handleOpenCamera} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Tomar Foto</button>
                </div>
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </div>
        
        {imagePreview && (
          <button onClick={handleGenerateDescription} disabled={isGenerating} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amarillo-suave text-gray-800 font-bold rounded-lg hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-wait">
            {isGenerating ? 'Generando...' : 'Generar Descripción con IA'}
            <SparklesIcon className="w-5 h-5"/>
          </button>
        )}

        <InputField label="Título" value={title} onChange={setTitle} placeholder="Ej: Pack de 3 Croissants" />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Ej: Deliciosos croissants recién horneados..." rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verde-med focus:border-transparent transition"></textarea>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <InputField label="Precio (€)" value={price} onChange={setPrice} placeholder="Ej: 2.50" type="number" />
          <InputField label="Stock (unidades)" value={stock} onChange={setStock} placeholder="Ej: 1" type="number" />
        </div>
        
        <InputField label="Hora máxima de recogida" value={pickupTime} onChange={setPickupTime} placeholder="Ej: Recoger antes de las 18:00" />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Etiquetas (generadas por IA)</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.length > 0 ? tags.map(tag => (
              <span key={tag} className="bg-verde-med/20 text-verde-med font-semibold px-3 py-1 rounded-full text-sm">{tag}</span>
            )) : <p className="text-sm text-gray-500">Aquí aparecerán las etiquetas generadas.</p>}
          </div>
        </div>

        {error && <div className="text-center p-3 bg-rojo-tomate/20 text-rojo-tomate font-medium rounded-lg">{error}</div>}

        <button className="w-full bg-rojo-tomate text-white font-bold py-4 rounded-xl text-lg hover:bg-opacity-90 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-rojo-tomate/50">
          Publicar Excedente
        </button>
      </div>
    </div>
  );
};

export default PostItemView;
