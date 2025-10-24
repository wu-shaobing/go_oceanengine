/**
 * SDK快速开始页面
 */

import { Card, Steps, Alert, Tabs } from 'antd';
import { PageTemplate } from '@/components/common/PageTemplate';
import { DataCard } from '@/components/common/DataCard';
import { Rocket, Download, Code, CheckCircle, Book, Zap } from 'lucide-react';

export default function QuickstartPage() {
  return (
    <PageTemplate
      title="SDK快速开始"
      breadcrumb={[{ label: 'SDK' }, { label: '快速开始' }]}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DataCard title="SDK版本" value="v3.2.1" icon={<Rocket size={24} />} />
        <DataCard title="支持API" value="120+" icon={<Code size={24} />} />
        <DataCard title="Go版本" value="1.16+" icon={<Zap size={24} />} />
        <DataCard title="产品线" value="3" icon={<Book size={24} />} />
      </div>

      {/* 欢迎提示 */}
      <Alert
        message="欢迎使用巨量引擎 Go SDK"
        description="本SDK提供巨量广告、巨量千川、抖+ 三大产品线的完整API封装，帮助您快速接入巨量引擎营销平台。"
        type="info"
        showIcon
        icon={<Rocket size={20} />}
        className="mb-6"
      />

      {/* 快速开始步骤 */}
      <Card title="快速开始" className="mb-6">
        <Steps
          direction="vertical"
          current={-1}
          items={[
            {
              title: '安装SDK',
              description: (
                <div className="space-y-3">
                  <p>使用 go get 安装最新版本：</p>
                  <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    <code>go get github.com/oceanengine/marketing-api-go-sdk</code>
                  </pre>
                </div>
              ),
              icon: <Download size={16} />,
            },
            {
              title: '配置认证',
              description: (
                <div className="space-y-3">
                  <p>初始化SDK并配置您的认证信息：</p>
                  <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    <code>{`package main

import (
    "github.com/oceanengine/marketing-api-go-sdk/pkg/api"
    "github.com/oceanengine/marketing-api-go-sdk/pkg/config"
)

func main() {
    // 创建配置
    cfg := config.NewConfig(
        "YOUR_APP_ID",
        "YOUR_APP_SECRET",
        "YOUR_ACCESS_TOKEN",
    )
    
    // 初始化客户端
    client := api.NewClient(cfg)
}`}</code>
                  </pre>
                </div>
              ),
              icon: <Code size={16} />,
            },
            {
              title: '发起API调用',
              description: (
                <div className="space-y-3">
                  <p>调用SDK方法获取数据或执行操作：</p>
                  <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    <code>{`// 示例：获取广告主信息
advertiserID := int64(1234567890)

resp, err := client.Ad.GetAdvertiser(advertiserID)
if err != nil {
    log.Fatal(err)
}

fmt.Printf("广告主名称: %s\\n", resp.Data.Name)
fmt.Printf("账户余额: %.2f\\n", resp.Data.Balance)`}</code>
                  </pre>
                </div>
              ),
              icon: <CheckCircle size={16} />,
            },
          ]}
        />
      </Card>

      {/* 代码示例 */}
      <Card title="完整示例" className="mb-6">
        <Tabs
          items={[
            {
              key: 'ad',
              label: '巨量广告',
              children: (
                <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                  <code>{`package main

import (
    "fmt"
    "log"
    "github.com/oceanengine/marketing-api-go-sdk/pkg/api"
    "github.com/oceanengine/marketing-api-go-sdk/pkg/config"
    "github.com/oceanengine/marketing-api-go-sdk/models/ad"
)

func main() {
    // 初始化SDK
    cfg := config.NewConfig("APP_ID", "APP_SECRET", "ACCESS_TOKEN")
    client := api.NewClient(cfg)
    
    advertiserID := int64(1234567890)
    
    // 创建广告计划
    req := &ad.CreateAdRequest{
        AdvertiserID: advertiserID,
        Name:         "我的第一个广告",
        Budget:       1000.0,
        Bid:          10.0,
        Status:       "ENABLE",
    }
    
    resp, err := client.Ad.CreateAd(req)
    if err != nil {
        log.Fatalf("创建广告失败: %v", err)
    }
    
    fmt.Printf("创建成功! 广告ID: %d\\n", resp.Data.AdID)
}`}</code>
                </pre>
              ),
            },
            {
              key: 'qianchuan',
              label: '巨量千川',
              children: (
                <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                  <code>{`package main

import (
    "fmt"
    "log"
    "github.com/oceanengine/marketing-api-go-sdk/pkg/api"
    "github.com/oceanengine/marketing-api-go-sdk/pkg/config"
    "github.com/oceanengine/marketing-api-go-sdk/models/qianchuan"
)

func main() {
    // 初始化SDK
    cfg := config.NewConfig("APP_ID", "APP_SECRET", "ACCESS_TOKEN")
    client := api.NewClient(cfg)
    
    advertiserID := int64(1234567890)
    
    // 创建千川推广计划
    req := &qianchuan.CreatePlanRequest{
        AdvertiserID: advertiserID,
        Name:         "商品推广计划",
        Budget:       2000.0,
        ProductID:    "3456789012",
    }
    
    resp, err := client.Qianchuan.CreatePlan(req)
    if err != nil {
        log.Fatalf("创建失败: %v", err)
    }
    
    fmt.Printf("创建成功! 计划ID: %d\\n", resp.Data.PlanID)
}`}</code>
                </pre>
              ),
            },
            {
              key: 'douplus',
              label: '抖+',
              children: (
                <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                  <code>{`package main

import (
    "fmt"
    "log"
    "github.com/oceanengine/marketing-api-go-sdk/pkg/api"
    "github.com/oceanengine/marketing-api-go-sdk/pkg/config"
    "github.com/oceanengine/marketing-api-go-sdk/models/douplus"
)

func main() {
    // 初始化SDK
    cfg := config.NewConfig("APP_ID", "APP_SECRET", "ACCESS_TOKEN")
    client := api.NewClient(cfg)
    
    // 创建视频加热订单
    req := &douplus.CreateOrderRequest{
        ItemID:   "7123456789012345678",  // 视频ID
        Amount:   100.0,                   // 投放金额
        Duration: 24,                      // 投放时长(小时)
    }
    
    resp, err := client.Douplus.CreateOrder(req)
    if err != nil {
        log.Fatalf("创建订单失败: %v", err)
    }
    
    fmt.Printf("订单创建成功! 订单ID: %s\\n", resp.Data.OrderID)
}`}</code>
                </pre>
              ),
            },
          ]}
        />
      </Card>

      {/* 系统要求 */}
      <Card title="系统要求">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Go版本要求</h4>
            <p className="text-gray-600">Go 1.16 或更高版本</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">依赖项</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>无外部依赖，仅使用Go标准库</li>
              <li>推荐使用 Go Modules 进行依赖管理</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">下一步</h4>
            <p className="text-gray-600">
              完成快速开始后，建议阅读{' '}
              <a href="#" className="text-blue-600 hover:underline">
                SDK配置与认证
              </a>{' '}
              了解详细的配置选项，然后查看{' '}
              <a href="#" className="text-blue-600 hover:underline">
                API接口列表
              </a>{' '}
              了解可用的API方法。
            </p>
          </div>
        </div>
      </Card>
    </PageTemplate>
  );
}
