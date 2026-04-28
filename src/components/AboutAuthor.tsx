import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Loader2, Award, BookOpen, Code, Heart, Upload } from 'lucide-react';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function AboutAuthor() {
  const [images, setImages] = useState<string[]>(['', '']);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    const checkAuthorAndLoadImages = async () => {
      // Check if current user is author
      const currentUser = auth.currentUser;
      if (currentUser && currentUser.email === 'nguyenquynghia00@gmail.com') {
        setIsAuthor(true);
      }

      // Load images from Firestore
      try {
        const docRef = doc(db, 'author_profile', 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.images && Array.isArray(data.images)) {
            setImages([data.images[0] || '', data.images[1] || '']);
          }
        }
      } catch (error) {
        console.error("Error loading author profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthorAndLoadImages();
  }, []);

  const resizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Compress to JPEG with 0.7 quality to keep base64 size small
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          resolve(dataUrl);
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !isAuthor) return;

    setIsUploading(true);
    try {
      // Resize and convert to base64
      const base64Image = await resizeImage(file);

      // Update local state
      const newImages = [...images];
      newImages[index] = base64Image;
      setImages(newImages);

      // Save to Firestore directly
      const docRef = doc(db, 'author_profile', 'main');
      await setDoc(docRef, { images: newImages }, { merge: true });
      
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Lỗi khi tải ảnh lên. Vui lòng thử lại.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4 mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
        >
          Về Tác Giả
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Image 1 */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="relative aspect-square rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-xl group border border-slate-200 dark:border-slate-700"
        >
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : images[0] ? (
            <img src={images[0]} alt="Nguyễn Quý Nghĩa" className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
              <Camera className="w-16 h-16 mb-4 opacity-50" />
              <p>Chưa có ảnh</p>
            </div>
          )}
          
          {isAuthor && (
            <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
              <Upload className="w-8 h-8 mb-2" />
              <span className="font-medium">Tải ảnh lên</span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(0, e)} disabled={isUploading} />
            </label>
          )}
        </motion.div>

        {/* Image 2 */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="relative aspect-square rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-xl group border border-slate-200 dark:border-slate-700"
        >
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : images[1] ? (
            <img src={images[1]} alt="Nguyễn Quý Nghĩa" className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
              <Camera className="w-16 h-16 mb-4 opacity-50" />
              <p>Chưa có ảnh</p>
            </div>
          )}
          
          {isAuthor && (
            <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
              <Upload className="w-8 h-8 mb-2" />
              <span className="font-medium">Tải ảnh lên</span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(1, e)} disabled={isUploading} />
            </label>
          )}
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-panel rounded-3xl p-8 md:p-10 shadow-xl border border-white/40 dark:border-slate-700/50 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
        
        <div className="relative z-10 space-y-6 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">Tôi là Nguyễn Quý Nghĩa</span>, học sinh lớp 7, hiện đang học tại trường THCS Quảng Phú Cầu.
          </p>
          
          <div className="flex items-start gap-4">
            <div className="mt-1 p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
              <Code className="w-6 h-6" />
            </div>
            <p>
              Tôi đang phát triển bản thân theo định hướng trở thành một người có khả năng dẫn dắt, với vai trò là <strong className="text-blue-600 dark:text-blue-400">Mentor và Developer</strong> trong học tập và các hoạt động công nghệ. Trong quá trình học tập, tôi luôn chủ động tìm tòi, xây dựng các công cụ hỗ trợ học tập và chia sẻ kiến thức với các bạn xung quanh.
            </p>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-1 p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
              <Heart className="w-6 h-6" />
            </div>
            <p>
              Tôi mong muốn tạo ra những sản phẩm, công cụ hữu ích giúp nâng cao hiệu quả học tập, tối ưu hóa thời gian và hỗ trợ mọi người tiếp cận kiến thức một cách dễ dàng hơn. Không chỉ tập trung vào cá nhân, tôi còn hướng tới việc đóng góp cho tập thể, xây dựng môi trường học tập tích cực và cùng nhau phát triển.
            </p>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-1 p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <Award className="w-6 h-6" />
            </div>
            <p>
              Với tinh thần trách nhiệm, kỷ luật và không ngừng cố gắng, tôi tin rằng mình có thể đảm nhận tốt vai trò của một lớp phó, hỗ trợ lớp trưởng và góp phần xây dựng tập thể ngày càng vững mạnh 📈.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
