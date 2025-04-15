import React from 'react';
import { useParams } from 'next/navigation';
import usePlants from '../../hooks/usePlants';
import { Plant } from '../../types';

const PlantDetail: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const { plants } = usePlants();
  const plant: Plant | undefined = plants.find((p) => p.id === id);

  if (!plant) {
    return <div>植物が見つかりませんでした。</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{plant.name}</h1>
      <p>種類: {plant.species}</p>
      <p>日照条件: {plant.light}</p>
      <p>水やり頻度: {plant.waterFrequencyDays}日ごと</p>
      <p>最終水やり日: {plant.lastWatered}</p>
      <p>メモ: {plant.notes}</p>

      <h2 className="mt-4 text-xl">水やり履歴</h2>
      <ul>
        {plant.waterLogs.map((log, index) => (
          <li key={index}>
            {log.date}: {log.note} {log.imageUrl && <img src={log.imageUrl} alt="水やりメモ" className="w-16 h-16" />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlantDetail;