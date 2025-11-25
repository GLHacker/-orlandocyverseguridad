import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { 
  Shield, 
  ArrowLeft, 
  Upload as UploadIcon, 
  Image as ImageIcon, 
  Video, 
  FileText, 
  Heart, 
  Eye, 
  MessageCircle,
  Search,
  Filter
} from "lucide-react";
import { Link } from "wouter";
import { APP_TITLE } from "@/const";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

export default function Gallery() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<"all" | "image" | "video" | "document">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [commentText, setCommentText] = useState("");

  const utils = trpc.useUtils();
  
  const { data: files, isLoading } = trpc.files.list.useQuery({ 
    type: activeTab 
  });

  const { data: comments } = trpc.comments.list.useQuery(
    { fileId: selectedFile?.file.id },
    { enabled: !!selectedFile }
  );

  const likeMutation = trpc.files.toggleLike.useMutation({
    onSuccess: () => {
      utils.files.list.invalidate();
    },
  });

  const commentMutation = trpc.comments.create.useMutation({
    onSuccess: () => {
      utils.comments.list.invalidate();
      setCommentText("");
      toast.success("Comentario agregado");
    },
  });

  const handleLike = (fileId: number) => {
    if (!isAuthenticated) {
      toast.error("Debes iniciar sesión para dar like");
      return;
    }
    likeMutation.mutate({ fileId });
  };

  const handleComment = () => {
    if (!isAuthenticated || !selectedFile) return;
    if (!commentText.trim()) {
      toast.error("El comentario no puede estar vacío");
      return;
    }
    commentMutation.mutate({
      fileId: selectedFile.file.id,
      content: commentText,
    });
  };

  const filteredFiles = files?.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.file.title.toLowerCase().includes(query) ||
      item.file.description?.toLowerCase().includes(query) ||
      item.file.category?.toLowerCase().includes(query)
    );
  });

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
              {isAuthenticated && (
                <Link href="/upload">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 border-glow">
                    <UploadIcon className="w-4 h-4 mr-2" />
                    Subir
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 py-12">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-2 glow-cyan" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Galería
            </h2>
            <p className="text-muted-foreground">
              Explora archivos compartidos por la comunidad
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar archivos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card/50 backdrop-blur-sm border-border/50"
              />
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="mb-8">
            <TabsList className="bg-card/50 backdrop-blur-sm border border-border/50">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Todos
              </TabsTrigger>
              <TabsTrigger value="image" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <ImageIcon className="w-4 h-4 mr-2" />
                Imágenes
              </TabsTrigger>
              <TabsTrigger value="video" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
                <Video className="w-4 h-4 mr-2" />
                Videos
              </TabsTrigger>
              <TabsTrigger value="document" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                <FileText className="w-4 h-4 mr-2" />
                Documentos
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, i) => (
                    <Card key={i} className="h-64 bg-card/50 backdrop-blur-sm animate-pulse" />
                  ))}
                </div>
              ) : filteredFiles && filteredFiles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredFiles.map((item) => (
                    <Card
                      key={item.file.id}
                      className="group cursor-pointer bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden"
                      onClick={() => setSelectedFile(item)}
                    >
                      {/* Preview */}
                      <div className="aspect-video bg-muted relative overflow-hidden">
                        {item.file.fileType === "image" ? (
                          <img
                            src={item.file.fileUrl}
                            alt={item.file.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : item.file.fileType === "video" ? (
                          <div className="w-full h-full flex items-center justify-center bg-secondary/20">
                            <Video className="w-16 h-16 text-secondary" />
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-accent/20">
                            <FileText className="w-16 h-16 text-accent" />
                          </div>
                        )}
                        {item.file.category && (
                          <div className="absolute top-2 right-2 px-2 py-1 bg-background/80 backdrop-blur-sm rounded text-xs text-primary">
                            {item.file.category}
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground mb-1 truncate">
                          {item.file.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {item.file.description || "Sin descripción"}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{item.user?.name || "Usuario"}</span>
                          <div className="flex items-center space-x-3">
                            <span className="flex items-center">
                              <Heart className="w-3 h-3 mr-1" />
                              {item.file.likes}
                            </span>
                            <span className="flex items-center">
                              <Eye className="w-3 h-3 mr-1" />
                              {item.file.views}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center bg-card/50 backdrop-blur-sm">
                  <p className="text-muted-foreground">
                    No se encontraron archivos
                  </p>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* File Detail Dialog */}
      <Dialog open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-md border-border">
          {selectedFile && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-foreground">{selectedFile.file.title}</DialogTitle>
              </DialogHeader>

              {/* File Preview */}
              <div className="mb-6">
                {selectedFile.file.fileType === "image" ? (
                  <img
                    src={selectedFile.file.fileUrl}
                    alt={selectedFile.file.title}
                    className="w-full rounded-lg"
                  />
                ) : selectedFile.file.fileType === "video" ? (
                  <video
                    src={selectedFile.file.fileUrl}
                    controls
                    className="w-full rounded-lg"
                  />
                ) : (
                  <div className="p-12 bg-muted rounded-lg text-center">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-accent" />
                    <a
                      href={selectedFile.file.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Descargar Documento
                    </a>
                  </div>
                )}
              </div>

              {/* File Info */}
              <div className="mb-6">
                <p className="text-muted-foreground mb-4">{selectedFile.file.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Por {selectedFile.user?.name || "Usuario"}
                  </span>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(selectedFile.file.id)}
                      className="text-muted-foreground hover:text-primary"
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      {selectedFile.file.likes}
                    </Button>
                    <span className="flex items-center text-muted-foreground">
                      <Eye className="w-4 h-4 mr-1" />
                      {selectedFile.file.views}
                    </span>
                  </div>
                </div>
              </div>

              {/* Comments */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Comentarios
                </h3>

                {isAuthenticated && (
                  <div className="mb-6">
                    <Textarea
                      placeholder="Escribe un comentario..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="mb-2 bg-background/50"
                    />
                    <Button
                      onClick={handleComment}
                      disabled={!commentText.trim() || commentMutation.isPending}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Comentar
                    </Button>
                  </div>
                )}

                <div className="space-y-4">
                  {comments && comments.length > 0 ? (
                    comments.map((comment) => (
                      <Card key={comment.comment.id} className="p-4 bg-background/50">
                        <div className="flex items-start space-x-3">
                          <div className="flex-1">
                            <p className="font-semibold text-sm text-foreground">
                              {comment.user?.name || "Usuario"}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {comment.comment.content}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No hay comentarios aún
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
