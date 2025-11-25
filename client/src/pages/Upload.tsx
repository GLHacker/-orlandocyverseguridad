import { useState, useCallback } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { Upload as UploadIcon, X, FileText, Image as ImageIcon, Video, Shield, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { APP_TITLE } from "@/const";

export default function Upload() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [fileType, setFileType] = useState<"image" | "video" | "document">("image");
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const uploadMutation = trpc.files.uploadDirect.useMutation({
    onSuccess: () => {
      toast.success("Archivo subido exitosamente");
      setFile(null);
      setTitle("");
      setDescription("");
      setCategory("");
      navigate("/gallery");
    },
    onError: (error) => {
      toast.error(`Error al subir archivo: ${error.message}`);
      setUploading(false);
    },
  });

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  }, []);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    
    // Auto-detect file type
    if (selectedFile.type.startsWith("image/")) {
      setFileType("image");
    } else if (selectedFile.type.startsWith("video/")) {
      setFileType("video");
    } else {
      setFileType("document");
    }
    
    // Auto-fill title if empty
    if (!title) {
      setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !title) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(",")[1];
        
        await uploadMutation.mutateAsync({
          fileName: file.name,
          fileData: base64,
          mimeType: file.type,
          title,
          description,
          fileType,
          category: category || undefined,
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Upload error:", error);
      setUploading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <p className="text-center text-muted-foreground">
            Debes iniciar sesión para subir archivos
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 cyber-gradient opacity-50" />
      <div className="fixed inset-0 cyber-grid opacity-20" />
      <div className="fixed inset-0 scanlines" />

      {/* Navigation */}
      <nav className="relative z-10 border-b border-border/50 backdrop-blur-md bg-background/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-primary glow-cyan" />
              <h1 className="text-2xl font-bold text-primary glow-cyan" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {APP_TITLE}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Inicio
                </Button>
              </Link>
              <Link href="/gallery">
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  Galería
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 py-12">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-2 glow-cyan" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Subir Archivo
            </h2>
            <p className="text-muted-foreground">
              Comparte fotos, videos o documentos con la comunidad
            </p>
          </div>

          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Drag & Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
                  isDragging
                    ? "border-primary bg-primary/10 border-glow"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {file ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      {fileType === "image" && <ImageIcon className="w-16 h-16 text-primary" />}
                      {fileType === "video" && <Video className="w-16 h-16 text-secondary" />}
                      {fileType === "document" && <FileText className="w-16 h-16 text-accent" />}
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-foreground">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setFile(null)}
                      className="border-destructive text-destructive hover:bg-destructive/10"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Eliminar
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <UploadIcon className="w-16 h-16 mx-auto text-primary" />
                    <div>
                      <p className="text-lg font-semibold text-foreground mb-2">
                        Arrastra y suelta tu archivo aquí
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        o haz clic para seleccionar
                      </p>
                      <input
                        type="file"
                        id="file-input"
                        className="hidden"
                        onChange={handleFileInputChange}
                        accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                      />
                      <label htmlFor="file-input">
                        <Button
                          type="button"
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary/10"
                          onClick={() => document.getElementById("file-input")?.click()}
                        >
                          Seleccionar Archivo
                        </Button>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-foreground">
                    Título *
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Nombre descriptivo del archivo"
                    required
                    className="bg-background/50 border-border"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-foreground">
                    Descripción
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe el contenido del archivo..."
                    rows={4}
                    className="bg-background/50 border-border"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fileType" className="text-foreground">
                      Tipo de Archivo *
                    </Label>
                    <Select value={fileType} onValueChange={(value: any) => setFileType(value)}>
                      <SelectTrigger className="bg-background/50 border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="image">Imagen</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="document">Documento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-foreground">
                      Categoría
                    </Label>
                    <Input
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="ej: Seguridad, Hardware, Tutorial"
                      className="bg-background/50 border-border"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Link href="/gallery">
                  <Button type="button" variant="outline" className="border-border">
                    Cancelar
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={!file || !title || uploading}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 border-glow"
                >
                  {uploading ? "Subiendo..." : "Subir Archivo"}
                  <UploadIcon className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}
