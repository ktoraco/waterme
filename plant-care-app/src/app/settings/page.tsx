'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useUserStore } from '@/store/user';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const { profiles, activeProfileId, addProfile, switchProfile } = useUserStore();
  const [newProfileName, setNewProfileName] = useState('');
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleAddProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProfileName.trim()) {
      addProfile(newProfileName);
      setNewProfileName('');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('ログアウト失敗です！', error);
      alert('ログアウト失敗です！');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-deep-950 mb-6">Settings</h1>

      <Card title="アカウント情報" className="mb-6 text-deep-950">
        {user ? (
          <div>
            <p className="mb-2">
              ログイン中: <span className="font-medium">{user.email}</span>
            </p>
            <Button variant="secondary" onClick={handleSignOut}>
              ログアウト
            </Button>
          </div>
        ) : (
          <div>
            <p className="mb-4 text-deep-600">
              ログインするとデータがクラウドに保存され、複数のデバイスで同期できます。
            </p>
            <div className="flex space-x-2">
              <a href="/auth/signin" className="btn text-deep-950">ログイン</a>
              <a href="/auth/signup" className="btn btn-secondary text-deep-950">
                新規登録
              </a>
            </div>
          </div>
        )}
      </Card>

      <Card title="ユーザープロファイル" className="mb-6 text-deep-950">
        <p className="mb-4 text-deep-600">
          複数のユーザーで使い分けるためのプロファイルを作成できます。
          プロファイルごとに別々の植物リストが管理されます。
        </p>

        <h3 className="font-medium mb-2 text-deep-950">プロファイル一覧</h3>
        {profiles.length > 0 ? (
          <ul className="mb-4 space-y-2">
            {profiles.map(profile => (
              <li 
                key={profile.id}
                className={`p-3 rounded-md cursor-pointer flex justify-between items-center ${
                  profile.id === activeProfileId ? 'bg-teal-100 border-l-4 border-teal-500' : 'bg-stone-50'
                }`}
                onClick={() => switchProfile(profile.id)}
              >
                <span className="font-medium">{profile.name}</span>
                {profile.id === activeProfileId && (
                  <span className="text-sm text-teal-600 font-medium">現在のプロファイル</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-deep-500 mb-4">まだプロファイルがありません。作成してみましょう！</p>
        )}

        <form onSubmit={handleAddProfile} className="flex gap-2">
          <Input
            label=""
            placeholder="新しいプロファイル名"
            value={newProfileName}
            onChange={(e) => setNewProfileName(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" className="mt-0 text-deep-800 font-bold">追加</Button>
        </form>
      </Card>

      <Card title="データ管理" className="mb-6 text-deep-950">
        <p className="mb-4 text-deep-600">
          注意: この操作は元に戻せません。
        </p>
        <Button 
          variant="secondary" 
          onClick={() => {
            if (confirm('本当にすべてのデータを削除しますか？この操作は元に戻せません。')) {
              localStorage.clear();
              window.location.reload();
            }
          }}
          className="bg-red-100 text-red-700 hover:bg-red-200"
        >
          ローカルデータをリセット
        </Button>
      </Card>
    </div>
  );
}