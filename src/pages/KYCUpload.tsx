import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, AlertCircle, CheckCircle, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function KYCUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/serviceprovider/login');
    }
  }, [user, navigate]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setUploading(true);
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "KYC Documents Submitted! 📄",
      description: "Your documents are under review. We'll notify you once approved.",
    });
    
    setUploading(false);
    navigate('/serviceprovider/dashboard');
  };

  const getRequiredDocuments = () => {
    const role = profile?.role;
    switch (role) {
      case 'mechanic':
        return [
          'Business License',
          'Garage Registration Certificate',
          'Professional Certification',
          'Insurance Certificate'
        ];
      case 'fuel_station':
        return [
          'Fuel Station License',
          'Environmental Permit',
          'Safety Certification',
          'Business Registration'
        ];
      case 'doctor':
        return [
          'Medical License',
          'Board Certification',
          'Malpractice Insurance',
          'Hospital Affiliation (if applicable)'
        ];
      default:
        return ['Required Documents'];
    }
  };

  if (!profile) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Clock className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p>Loading profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-neon-cyan to-sunset-orange bg-clip-text text-transparent">
                KYC Verification
              </span>
            </h1>
            <p className="text-muted-foreground">
              Upload your documents to complete the verification process
            </p>
          </div>

          {/* Status Card */}
          <Card className="glass-strong border-border mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                Verification Status: Pending
              </CardTitle>
              <CardDescription>
                Please upload all required documents to proceed with account activation
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Required Documents */}
          <Card className="glass-strong border-border mb-6">
            <CardHeader>
              <CardTitle>Required Documents</CardTitle>
              <CardDescription>
                Please ensure all documents are clear, valid, and up-to-date
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {getRequiredDocuments().map((doc, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-background-secondary rounded-lg">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <span className="flex-1">{doc}</span>
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upload Area */}
          <Card className="glass-strong border-border">
            <CardHeader>
              <CardTitle>Upload Documents</CardTitle>
              <CardDescription>
                Drag and drop files or click to browse (PDF, JPG, PNG accepted)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Upload Zone */}
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <div className="space-y-2">
                    <p className="text-lg font-medium">Drop files here</p>
                    <p className="text-sm text-muted-foreground">
                      or click to browse your computer
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-medium">Uploaded Files ({uploadedFiles.length})</h3>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-background-secondary rounded-lg">
                        <FileText className="w-5 h-5 text-primary" />
                        <div className="flex-1">
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex gap-4">
                  <Button
                    onClick={handleSubmit}
                    disabled={uploadedFiles.length === 0 || uploading}
                    variant="hero"
                    className="flex-1"
                  >
                    {uploading ? "Submitting Documents..." : "Submit for Review"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/serviceprovider/login')}
                  >
                    Cancel
                  </Button>
                </div>

                {/* Help Text */}
                <div className="bg-background-secondary rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> Your documents will be reviewed within 24-48 hours. 
                    You'll receive an email notification once your account is approved.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}