import { useState } from 'react'
import './App.css'
import { CopilotChat } from "@copilotkit/react-ui";
import { useCopilotAction, useCopilotReadable } from '@copilotkit/react-core'

// 地图组件 - 现代化设计
function MapView({ location, address, timestamp }: { 
  location?: { lat: number; lng: number }, 
  address?: string,
  timestamp?: number 
}) {
  if (!location && !address) {
    return (
      <div style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '12px',
        color: 'white',
        fontSize: '18px',
        fontWeight: '500',
        padding: '40px',
        textAlign: 'center',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
      }}>
        <div>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🗺️</div>
          <div>请告诉我你想查看哪个地点的地图</div>
          <div style={{ fontSize: '14px', marginTop: '10px', opacity: 0.9 }}>
            例如："显示北京天安门" 或 "上海东方明珠的位置"
          </div>
        </div>
      </div>
    );
  }
  
  // 使用 OpenStreetMap，添加时间戳强制刷新
  const osmUrl = location
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${location.lng - 0.01},${location.lat - 0.01},${location.lng + 0.01},${location.lat + 0.01}&layer=mapnik&marker=${location.lat},${location.lng}`
    : `https://www.openstreetmap.org/export/embed.html?bbox=116.3,39.9,116.5,40.0&layer=mapnik`;

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
      background: 'white'
    }}>
      <div style={{ 
        padding: '20px 24px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '4px' }}>
            📍 {address || '地图位置'}
          </div>
          {location && (
            <div style={{ fontSize: '13px', opacity: 0.9 }}>
              坐标: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </div>
          )}
        </div>
      </div>
      <div style={{ flex: 1, position: 'relative', minHeight: '500px' }}>
        <iframe
          key={`map-${timestamp}`}  // 使用 key 强制重新渲染
          width="100%"
          height="100%"
          style={{ border: 0, display: 'block' }}
          loading="lazy"
          src={osmUrl}
          title={`地图 - ${address || '位置'}`}
        />
      </div>
      <div style={{ 
        padding: '12px 24px', 
        fontSize: '13px', 
        color: '#666',
        background: '#f8f9fa',
        borderTop: '1px solid #e9ecef'
      }}>
        💡 由 OpenStreetMap 提供 | 可缩放和拖动查看
      </div>
    </div>
  );
}

function App() {
  const [mapLocation, setMapLocation] = useState<{ lat: number; lng: number; address: string; timestamp: number } | null>(null)

  // 让 Copilot 知道当前显示的地图位置
  useCopilotReadable({
    description: "当前显示的地图位置信息",
    value: mapLocation ? `${mapLocation.address} (${mapLocation.lat}, ${mapLocation.lng})` : "未显示地图",
  })

  // 添加显示地图的动作
  useCopilotAction({
    name: "showMap",
    description: "显示指定地点的地图。可以通过地址名称或经纬度坐标来显示地图。当用户想查看某个地点、想知道某个地方在哪里、或者询问地理位置时，就使用这个动作。",
    parameters: [
      {
        name: "address",
        type: "string",
        description: "地点的地址名称，例如：'北京天安门'、'上海东方明珠'、'纽约时代广场'、'巴黎埃菲尔铁塔'",
        required: false,
      },
      {
        name: "latitude",
        type: "number",
        description: "纬度坐标（-90 到 90）",
        required: false,
      },
      {
        name: "longitude",
        type: "number",
        description: "经度坐标（-180 到 180）",
        required: false,
      },
    ],
    handler: async ({ address, latitude, longitude }) => {
      const timestamp = Date.now(); // 添加时间戳确保每次都更新
      
      if (latitude !== undefined && longitude !== undefined) {
        setMapLocation({ 
          lat: latitude, 
          lng: longitude, 
          address: address || `坐标 ${latitude}, ${longitude}`,
          timestamp 
        })
        return `✅ 已为你显示 ${address || `坐标 ${latitude}, ${longitude}`} 的地图`;
      } else if (address) {
        // 模拟一些常见地点的坐标（实际应用中可以调用地理编码 API）
        const knownPlaces: Record<string, { lat: number; lng: number }> = {
          "北京天安门": { lat: 39.9042, lng: 116.4074 },
          "天安门": { lat: 39.9042, lng: 116.4074 },
          "上海东方明珠": { lat: 31.2397, lng: 121.4997 },
          "东方明珠": { lat: 31.2397, lng: 121.4997 },
          "广州塔": { lat: 23.1088, lng: 113.3191 },
          "深圳": { lat: 22.5431, lng: 114.0579 },
          "杭州西湖": { lat: 30.2489, lng: 120.1489 },
          "西湖": { lat: 30.2489, lng: 120.1489 },
          "纽约时代广场": { lat: 40.7580, lng: -73.9855 },
          "时代广场": { lat: 40.7580, lng: -73.9855 },
          "巴黎埃菲尔铁塔": { lat: 48.8584, lng: 2.2945 },
          "埃菲尔铁塔": { lat: 48.8584, lng: 2.2945 },
          "东京塔": { lat: 35.6586, lng: 139.7454 },
          "伦敦": { lat: 51.5074, lng: -0.1278 },
        };
        
        const coords = knownPlaces[address];
        if (coords) {
          setMapLocation({ ...coords, address, timestamp })
          return `✅ 已为你显示 ${address} 的地图`;
        } else {
          // 默认显示一个位置（北京）
          setMapLocation({ lat: 39.9042, lng: 116.4074, address, timestamp })
          return `✅ 已为你显示 ${address} 的大致位置（如需精确位置，请提供具体坐标）`;
        }
      }
      return "❌ 请提供地址名称或坐标";
    },
    render: ({ status, result }) => {
      if (status === "complete") {
        return (
          <div style={{ 
            padding: '12px 16px', 
            background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
            border: '1px solid #667eea40',
            borderRadius: '8px',
            marginTop: '8px',
            fontSize: '14px',
            color: '#333'
          }}>
            {result}
          </div>
        );
      }
      return <></>;
    },
  })

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)',
      overflow: 'hidden'
    }}>
      {/* 顶部标题栏 */}
      <header style={{
        padding: '20px 32px',
        background: 'white',
        borderBottom: '1px solid #e9ecef',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1800px',
          margin: '0 auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              fontSize: '32px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: '700'
            }}>
              🤖 AI 地图助手
            </div>
            <div style={{
              fontSize: '14px',
              color: '#666',
              marginTop: '8px',
              fontWeight: '400'
            }}>
              智能地图查询助手
            </div>
          </div>
        </div>
      </header>

      {/* 主内容区 - 两栏布局 */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '600px 1fr',
        gap: '24px',
        padding: '24px 32px',
        maxWidth: '1800px',
        width: '100%',
        margin: '0 auto',
        overflow: 'hidden'
      }}>
        {/* 左侧：AI 聊天 */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          height: '100%'
        }}>
          <div style={{
            padding: '20px 24px',
            borderBottom: '1px solid #e9ecef',
            background: 'linear-gradient(135deg, #667eea05 0%, #764ba205 100%)',
            flexShrink: 0
          }}>
            <h2 style={{ 
              margin: 0, 
              fontSize: '20px',
              fontWeight: '600',
              color: '#333'
            }}>
              💬 AI 助手
            </h2>
            <p style={{
              margin: '8px 0 0 0',
              fontSize: '13px',
              color: '#666'
            }}>
              我可以帮你查看世界各地的地图位置
            </p>
          </div>
          <div 
            className="chat-container"
            style={{ 
              flex: 1, 
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 0
            }}
          >
            <CopilotChat
              instructions="你是一个专业的 AI 地图助手。当用户想查看某个地点、询问某个地方在哪里、或者想了解地理位置时，你应该使用 showMap 动作来显示地图。请用友好、简洁的语言回复。支持的知名地点包括：北京天安门、上海东方明珠、广州塔、深圳、杭州西湖、纽约时代广场、巴黎埃菲尔铁塔、东京塔、伦敦等，也可以通过经纬度坐标查询任意位置。"
              labels={{
                title: "AI 地图助手",
                initial: "你好！👋 我是你的智能地图助手，可以帮你查看世界各地的地图位置。\n\n试试问我：\n• \"显示北京天安门\"\n• \"上海东方明珠在哪里？\"\n• \"带我看看巴黎埃菲尔铁塔\"\n• \"显示纽约时代广场的位置\"\n• \"查看坐标 40.7580, -73.9855\"",
                placeholder: "问我任何地点...",
              }}
            />
          </div>
        </div>

        {/* 右侧：地图显示区域 */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <MapView 
            location={mapLocation?.lat ? { lat: mapLocation.lat, lng: mapLocation.lng } : undefined} 
            address={mapLocation?.address}
            timestamp={mapLocation?.timestamp}
          />
        </div>
      </div>
    </div>
  )
}

export default App
