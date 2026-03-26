'use client';

import { useState, useEffect, useCallback } from "react";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "../../../amplify/data/resource";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { FormField } from "../molecules/FormField";
import { Button } from "../atoms/Button";
import { MapPin, Loader2, Save } from "lucide-react";

const client = generateClient<Schema>();

interface AddressModalProps {
  onAddressSaved: (fullAddress: string) => void;
}

export function AddressModal({ onAddressSaved }: AddressModalProps) {
  const { user, authStatus } = useAuthenticator((context) => [context.user, context.authStatus]);
  const [pref, setPref] = useState("");
  const [city, setCity] = useState("");
  const [ward, setWard] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  const checkUserProfile = useCallback(async () => {
    if (authStatus !== 'authenticated' || !user) {
      setChecking(false);
      setIsOpen(false);
      return;
    }
    
    try {
      const { data: profiles } = await client.models.UserProfile.list();
      if (profiles.length === 0) {
        setIsOpen(true);
      } else {
        const profile = profiles[0];
        onAddressSaved(`${profile.pref}${profile.city}${profile.ward}`);
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setChecking(false);
    }
  }, [user, authStatus, onAddressSaved]);

  useEffect(() => {
    if (authStatus === 'configuring') return;
    checkUserProfile();
  }, [checkUserProfile, authStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await client.models.UserProfile.create({
        pref,
        city,
        ward,
      });
      onAddressSaved(`${pref}${city}${ward}`);
      setIsOpen(false);
    } catch (error) {
      console.error("Error saving address:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || checking) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white/90 border border-white/20 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-8 transform transition-all scale-100 animate-in zoom-in-95 duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">住所の登録</h2>
            <p className="text-slate-500 text-sm">初回のみ、お住まいの地域を登録してください。</p>
          </div>
        </div>
        
        <div className="text-slate-900">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4 text-slate-900">
              <FormField
                label="都道府県"
                required
                placeholder="例: 東京都"
                className="!text-slate-900 !bg-slate-100 !border-slate-300"
                value={pref}
                onChange={(e) => setPref(e.target.value)}
              />
              <FormField
                label="市区町村"
                required
                placeholder="例: 渋谷区"
                className="!text-slate-900 !bg-slate-100 !border-slate-300"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <FormField
                label="町名・自治体区分"
                required
                placeholder="例: 代々木"
                className="!text-slate-900 !bg-slate-100 !border-slate-300"
                value={ward}
                onChange={(e) => setWard(e.target.value)}
              />
              <Button
                type="submit"
                disabled={loading || !pref || !city || !ward}
                icon={loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              >
                {loading ? "登録中..." : "登録して利用を開始する"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
