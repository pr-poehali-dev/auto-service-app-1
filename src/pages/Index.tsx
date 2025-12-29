import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import BookingCalendar from '@/components/BookingCalendar';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showBooking, setShowBooking] = useState(false);

  const orders = [
    {
      id: 1,
      carModel: 'BMW X5',
      carNumber: 'A123BC77',
      service: 'Диагностика двигателя',
      status: 'in_progress',
      progress: 65,
      master: 'Иван Петров',
      startDate: '28.12.2024',
      estimatedEnd: '30.12.2024'
    },
    {
      id: 2,
      carModel: 'Mercedes C-Class',
      carNumber: 'B456DE99',
      service: 'Замена масла',
      status: 'ready',
      progress: 100,
      master: 'Сергей Иванов',
      startDate: '25.12.2024',
      estimatedEnd: '28.12.2024'
    }
  ];

  const masters = [
    {
      id: 1,
      name: 'Иван Петров',
      specialty: 'Диагностика',
      rating: 4.9,
      experience: '12 лет',
      avatar: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Сергей Иванов',
      specialty: 'Ремонт двигателя',
      rating: 4.8,
      experience: '8 лет',
      avatar: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'Алексей Смирнов',
      specialty: 'Кузовной ремонт',
      rating: 4.7,
      experience: '10 лет',
      avatar: '/placeholder.svg'
    },
    {
      id: 4,
      name: 'Дмитрий Козлов',
      specialty: 'Электрика',
      rating: 4.9,
      experience: '15 лет',
      avatar: '/placeholder.svg'
    }
  ];

  const renderHome = () => (
    <div className="pb-24 animate-fade-in">
      <div className="bg-gradient-to-br from-primary via-secondary to-accent p-6 rounded-3xl mb-6 animate-scale-in">
        <h1 className="text-3xl font-bold text-white mb-2">PogodinAUTO</h1>
        <p className="text-white/90 text-sm">Профессиональный ремонт вашего автомобиля</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card 
          onClick={() => setShowBooking(true)}
          className="p-4 bg-card border-border hover:scale-105 transition-transform cursor-pointer animate-slide-up"
        >
          <div className="bg-primary/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-3">
            <Icon name="Calendar" className="text-primary" size={24} />
          </div>
          <h3 className="font-semibold text-white mb-1">Записаться</h3>
          <p className="text-xs text-muted-foreground">на ремонт</p>
        </Card>

        <Card className="p-4 bg-card border-border hover:scale-105 transition-transform cursor-pointer animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-accent/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-3">
            <Icon name="Calculator" className="text-accent" size={24} />
          </div>
          <h3 className="font-semibold text-white mb-1">Калькулятор</h3>
          <p className="text-xs text-muted-foreground">стоимости</p>
        </Card>

        <Card className="p-4 bg-card border-border hover:scale-105 transition-transform cursor-pointer animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-secondary/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-3">
            <Icon name="Users" className="text-secondary" size={24} />
          </div>
          <h3 className="font-semibold text-white mb-1">Мастера</h3>
          <p className="text-xs text-muted-foreground">специалисты</p>
        </Card>

        <Card className="p-4 bg-card border-border hover:scale-105 transition-transform cursor-pointer animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="bg-primary/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-3">
            <Icon name="Phone" className="text-primary" size={24} />
          </div>
          <h3 className="font-semibold text-white mb-1">Контакты</h3>
          <p className="text-xs text-muted-foreground">связаться</p>
        </Card>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-4">Популярные услуги</h2>
        <div className="space-y-3">
          {['Диагностика двигателя', 'Замена масла', 'Шиномонтаж', 'Развал-схождение'].map((service, idx) => (
            <Card key={idx} className="p-4 bg-card border-border hover:border-primary transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 w-10 h-10 rounded-xl flex items-center justify-center">
                    <Icon name="Wrench" className="text-primary" size={20} />
                  </div>
                  <span className="font-medium text-white">{service}</span>
                </div>
                <Icon name="ChevronRight" className="text-muted-foreground" size={20} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="pb-24 animate-fade-in">
      <h1 className="text-2xl font-bold text-white mb-6">Мои заказы</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="p-5 bg-card border-border hover:border-primary transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-white text-lg mb-1">{order.carModel}</h3>
                <p className="text-sm text-muted-foreground">{order.carNumber}</p>
              </div>
              <Badge 
                className={`${
                  order.status === 'ready' 
                    ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                    : 'bg-primary/20 text-primary border-primary/30'
                }`}
              >
                {order.status === 'ready' ? 'Готов' : 'В работе'}
              </Badge>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Icon name="Wrench" className="text-accent" size={16} />
                <span className="text-white">{order.service}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon name="User" className="text-secondary" size={16} />
                <span className="text-muted-foreground">{order.master}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon name="Calendar" className="text-primary" size={16} />
                <span className="text-muted-foreground">{order.startDate} - {order.estimatedEnd}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Прогресс</span>
                <span className="text-white font-semibold">{order.progress}%</span>
              </div>
              <Progress value={order.progress} className="h-2" />
            </div>

            {order.status === 'ready' && (
              <Button className="w-full mt-4 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <Icon name="Bell" size={18} className="mr-2" />
                Получить уведомление
              </Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMasters = () => (
    <div className="pb-24 animate-fade-in">
      <h1 className="text-2xl font-bold text-white mb-6">Наши мастера</h1>
      <div className="grid grid-cols-1 gap-4">
        {masters.map((master) => (
          <Card key={master.id} className="p-5 bg-card border-border hover:border-primary transition-all hover:scale-[1.02]">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-16 h-16 ring-2 ring-primary/30">
                <AvatarImage src={master.avatar} />
                <AvatarFallback className="bg-primary text-white text-lg font-bold">
                  {master.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-bold text-white text-lg">{master.name}</h3>
                <p className="text-sm text-muted-foreground">{master.specialty}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-accent font-semibold mb-1">
                  <Icon name="Star" size={16} fill="currentColor" />
                  <span>{master.rating}</span>
                </div>
                <p className="text-xs text-muted-foreground">{master.experience}</p>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              <Icon name="MessageCircle" size={18} className="mr-2" />
              Записаться к мастеру
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="pb-24 animate-fade-in">
      <div className="bg-gradient-to-br from-primary via-secondary to-accent p-6 rounded-3xl mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="w-20 h-20 ring-4 ring-white/20">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-white text-primary text-2xl font-bold">АП</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold text-white">Алексей Петров</h2>
            <p className="text-white/80">alex.petrov@mail.ru</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <Card className="p-4 bg-card border-border hover:border-primary transition-colors cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 w-10 h-10 rounded-xl flex items-center justify-center">
                <Icon name="Car" className="text-primary" size={20} />
              </div>
              <span className="font-medium text-white">Мои автомобили</span>
            </div>
            <Icon name="ChevronRight" className="text-muted-foreground" size={20} />
          </div>
        </Card>

        <Card className="p-4 bg-card border-border hover:border-primary transition-colors cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-secondary/20 w-10 h-10 rounded-xl flex items-center justify-center">
                <Icon name="Bell" className="text-secondary" size={20} />
              </div>
              <span className="font-medium text-white">Уведомления</span>
            </div>
            <Icon name="ChevronRight" className="text-muted-foreground" size={20} />
          </div>
        </Card>

        <Card className="p-4 bg-card border-border hover:border-primary transition-colors cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-accent/20 w-10 h-10 rounded-xl flex items-center justify-center">
                <Icon name="CreditCard" className="text-accent" size={20} />
              </div>
              <span className="font-medium text-white">Способы оплаты</span>
            </div>
            <Icon name="ChevronRight" className="text-muted-foreground" size={20} />
          </div>
        </Card>

        <Card className="p-4 bg-card border-border hover:border-primary transition-colors cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 w-10 h-10 rounded-xl flex items-center justify-center">
                <Icon name="Settings" className="text-primary" size={20} />
              </div>
              <span className="font-medium text-white">Настройки</span>
            </div>
            <Icon name="ChevronRight" className="text-muted-foreground" size={20} />
          </div>
        </Card>
      </div>

      <Button variant="outline" className="w-full border-destructive text-destructive hover:bg-destructive hover:text-white">
        <Icon name="LogOut" size={18} className="mr-2" />
        Выйти из аккаунта
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {showBooking && <BookingCalendar onClose={() => setShowBooking(false)} />}
      
      <div className="max-w-md mx-auto px-4 pt-6">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'orders' && renderOrders()}
        {activeTab === 'masters' && renderMasters()}
        {activeTab === 'profile' && renderProfile()}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-around">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                activeTab === 'home' 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              <Icon name="Home" size={24} />
              <span className="text-xs font-medium">Главная</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                activeTab === 'orders' 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              <Icon name="ClipboardList" size={24} />
              <span className="text-xs font-medium">Заказы</span>
            </button>

            <button
              onClick={() => setActiveTab('masters')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                activeTab === 'masters' 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              <Icon name="Users" size={24} />
              <span className="text-xs font-medium">Мастера</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                activeTab === 'profile' 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              <Icon name="User" size={24} />
              <span className="text-xs font-medium">Профиль</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;