import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Smartphone, 
  Watch, 
  Activity,
  Heart,
  Wifi,
  WifiOff,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Settings,
  Bluetooth,
  Zap,
  Clock,
  TrendingUp,
  Shield
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Device {
  id: string;
  name: string;
  type: 'smartwatch' | 'fitness_tracker' | 'smart_scale' | 'smartphone' | 'chest_strap';
  brand: string;
  model: string;
  isConnected: boolean;
  batteryLevel?: number;
  lastSync?: Date;
  syncStatus: 'synced' | 'syncing' | 'error' | 'never';
  dataTypes: string[];
  icon: React.ComponentType<any>;
  color: string;
}

interface SyncData {
  steps: number;
  heartRate: number;
  calories: number;
  distance: number;
  activeMinutes: number;
  weight?: number;
}

// todo: remove mock functionality
const mockDevices: Device[] = [
  {
    id: '1',
    name: 'Apple Watch Series 9',
    type: 'smartwatch',
    brand: 'Apple',
    model: 'Series 9',
    isConnected: true,
    batteryLevel: 87,
    lastSync: new Date(Date.now() - 10 * 60 * 1000),
    syncStatus: 'synced',
    dataTypes: ['Heart Rate', 'Steps', 'Calories', 'Workouts', 'Sleep'],
    icon: Watch,
    color: 'from-gray-700 to-gray-900'
  },
  {
    id: '2',
    name: 'Fitbit Charge 6',
    type: 'fitness_tracker',
    brand: 'Fitbit',
    model: 'Charge 6',
    isConnected: true,
    batteryLevel: 65,
    lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000),
    syncStatus: 'synced',
    dataTypes: ['Steps', 'Heart Rate', 'Sleep', 'Stress'],
    icon: Activity,
    color: 'from-blue-500 to-blue-700'
  },
  {
    id: '3',
    name: 'Withings Body+',
    type: 'smart_scale',
    brand: 'Withings',
    model: 'Body+',
    isConnected: false,
    lastSync: new Date(Date.now() - 24 * 60 * 60 * 1000),
    syncStatus: 'error',
    dataTypes: ['Weight', 'BMI', 'Body Fat'],
    icon: TrendingUp,
    color: 'from-green-500 to-green-700'
  },
  {
    id: '4',
    name: 'iPhone 15 Pro',
    type: 'smartphone',
    brand: 'Apple',
    model: 'iPhone 15 Pro',
    isConnected: true,
    batteryLevel: 92,
    lastSync: new Date(Date.now() - 5 * 60 * 1000),
    syncStatus: 'synced',
    dataTypes: ['Steps', 'Distance', 'Flights Climbed'],
    icon: Smartphone,
    color: 'from-purple-500 to-purple-700'
  }
];

const mockSyncData: SyncData = {
  steps: 8547,
  heartRate: 72,
  calories: 2180,
  distance: 6.2,
  activeMinutes: 42,
  weight: 75.3
};

interface DeviceSyncProps {
  onDataSync?: (data: SyncData) => void;
}

export default function DeviceSync({ onDataSync }: DeviceSyncProps) {
  const [devices, setDevices] = useState<Device[]>(mockDevices);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [showAddDevice, setShowAddDevice] = useState(false);

  const handleSync = async (deviceId: string) => {
    setDevices(prev => prev.map(device => 
      device.id === deviceId 
        ? { ...device, syncStatus: 'syncing' as const }
        : device
    ));

    // Simulate sync process
    setTimeout(() => {
      setDevices(prev => prev.map(device => 
        device.id === deviceId 
          ? { 
              ...device, 
              syncStatus: 'synced' as const, 
              lastSync: new Date() 
            }
          : device
      ));
      
      onDataSync?.(mockSyncData);
      console.log(`Device ${deviceId} synced successfully`);
    }, 2000);
  };

  const handleConnect = (deviceId: string) => {
    setDevices(prev => prev.map(device => 
      device.id === deviceId 
        ? { ...device, isConnected: true, syncStatus: 'synced' as const }
        : device
    ));
    console.log(`Device ${deviceId} connected`);
  };

  const handleDisconnect = (deviceId: string) => {
    setDevices(prev => prev.map(device => 
      device.id === deviceId 
        ? { ...device, isConnected: false, syncStatus: 'never' as const }
        : device
    ));
    console.log(`Device ${deviceId} disconnected`);
  };

  const scanForDevices = () => {
    setIsScanning(true);
    console.log('Scanning for nearby devices...');
    
    setTimeout(() => {
      setIsScanning(false);
      console.log('Scan completed');
    }, 3000);
  };

  const getSyncStatusIcon = (status: Device['syncStatus']) => {
    switch (status) {
      case 'synced':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'syncing':
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <WifiOff className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const formatLastSync = (date?: Date) => {
    if (!date) return 'Never';
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / 1440)}d ago`;
  };

  const connectedDevices = devices.filter(d => d.isConnected);
  const availableDevices = devices.filter(d => !d.isConnected);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-accent font-bold text-foreground">Device Sync</h2>
          <p className="text-muted-foreground mt-1">
            Connect and sync your health devices
          </p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 lg:mt-0">
          <Button
            variant="outline"
            onClick={scanForDevices}
            disabled={isScanning}
            data-testid="button-scan-devices"
          >
            <Bluetooth className={`w-4 h-4 mr-2 ${isScanning ? 'animate-pulse' : ''}`} />
            {isScanning ? 'Scanning...' : 'Scan Devices'}
          </Button>
          
          <Dialog open={showAddDevice} onOpenChange={setShowAddDevice}>
            <DialogTrigger asChild>
              <Button data-testid="button-add-device">
                <Settings className="w-4 h-4 mr-2" />
                Add Device
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Device</DialogTitle>
                <DialogDescription>
                  Connect a new health tracking device to sync your data
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Follow these steps to connect your device:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Make sure your device is in pairing mode</li>
                  <li>Enable Bluetooth on your phone/computer</li>
                  <li>Click "Scan Devices" to find nearby devices</li>
                  <li>Select your device from the list</li>
                  <li>Follow the on-screen instructions</li>
                </ol>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDevice(false)}>
                  Close
                </Button>
                <Button onClick={() => { scanForDevices(); setShowAddDevice(false); }}>
                  Start Scanning
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Sync Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected Devices</CardTitle>
            <Wifi className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-connected-count">
              {connectedDevices.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              actively syncing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Sync</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-last-sync">
              {formatLastSync(connectedDevices.length > 0 
                ? new Date(Math.max(...connectedDevices.map(d => d.lastSync?.getTime() || 0)))
                : undefined
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              most recent
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Points</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-data-points">
              {connectedDevices.reduce((total, device) => total + device.dataTypes.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              types synced
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600" data-testid="text-health-score">
              92%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              data quality
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Connected Devices */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Connected Devices</CardTitle>
            <CardDescription>
              Your currently connected health tracking devices
            </CardDescription>
          </CardHeader>
          <CardContent>
            {connectedDevices.length > 0 ? (
              <div className="space-y-4">
                {connectedDevices.map((device) => (
                  <motion.div
                    key={device.id}
                    layout
                    className="flex items-center justify-between p-4 border rounded-lg hover-elevate"
                    data-testid={`connected-device-${device.id}`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${device.color} flex items-center justify-center`}>
                        <device.icon className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-medium">{device.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span>{device.brand} {device.model}</span>
                          <div className="flex items-center space-x-1">
                            {getSyncStatusIcon(device.syncStatus)}
                            <span>{formatLastSync(device.lastSync)}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {device.dataTypes.slice(0, 3).map((type) => (
                            <Badge key={type} variant="secondary" className="text-xs">
                              {type}
                            </Badge>
                          ))}
                          {device.dataTypes.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{device.dataTypes.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {device.batteryLevel && (
                        <div className="text-center">
                          <div className="text-sm font-medium">{device.batteryLevel}%</div>
                          <Progress 
                            value={device.batteryLevel} 
                            className="w-16 h-1"
                            data-testid={`battery-${device.id}`}
                          />
                        </div>
                      )}
                      
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSync(device.id)}
                          disabled={device.syncStatus === 'syncing'}
                          data-testid={`button-sync-${device.id}`}
                        >
                          <RefreshCw className={`w-4 h-4 ${device.syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedDevice(device)}
                          data-testid={`button-settings-${device.id}`}
                        >
                          <Settings className="w-4 h-4" />
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDisconnect(device.id)}
                          className="text-destructive hover:text-destructive"
                          data-testid={`button-disconnect-${device.id}`}
                        >
                          <WifiOff className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <WifiOff className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">No devices connected</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect your fitness devices to start syncing health data
                </p>
                <Button onClick={() => setShowAddDevice(true)}>
                  Add Your First Device
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Available Devices */}
      {availableDevices.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Available Devices</CardTitle>
              <CardDescription>
                Previously connected devices that can be reconnected
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {availableDevices.map((device) => (
                  <div
                    key={device.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover-elevate"
                    data-testid={`available-device-${device.id}`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${device.color} opacity-50 flex items-center justify-center`}>
                        <device.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-muted-foreground">{device.name}</h4>
                        <p className="text-sm text-muted-foreground">Last sync: {formatLastSync(device.lastSync)}</p>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleConnect(device.id)}
                      data-testid={`button-connect-${device.id}`}
                    >
                      <Wifi className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Device Settings Dialog */}
      <Dialog open={!!selectedDevice} onOpenChange={() => setSelectedDevice(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedDevice?.name} Settings</DialogTitle>
            <DialogDescription>
              Configure sync settings and data preferences
            </DialogDescription>
          </DialogHeader>
          
          {selectedDevice && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${selectedDevice.color} flex items-center justify-center`}>
                  <selectedDevice.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-medium">{selectedDevice.name}</h4>
                  <p className="text-sm text-muted-foreground">{selectedDevice.brand} {selectedDevice.model}</p>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium mb-2">Data Types</h5>
                <div className="grid grid-cols-2 gap-2">
                  {selectedDevice.dataTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{type}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="font-medium mb-2">Sync Frequency</h5>
                <select className="w-full p-2 border rounded-md">
                  <option>Real-time</option>
                  <option>Every 15 minutes</option>
                  <option>Every hour</option>
                  <option>Manual only</option>
                </select>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedDevice(null)}>
              Close
            </Button>
            <Button>Save Settings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}