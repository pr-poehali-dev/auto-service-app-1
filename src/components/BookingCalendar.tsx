import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface BookingCalendarProps {
  onClose: () => void;
}

const BookingCalendar = ({ onClose }: BookingCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const workingHours = [
    '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const getDaysInMonth = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const getAvailabilityStatus = (date: Date | null) => {
    if (!date) return 'empty';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) return 'past';
    
    const dayOfWeek = date.getDay();
    const dateNum = date.getDate();
    
    if (dateNum % 3 === 0) return 'busy';
    if (dateNum % 5 === 0) return 'free';
    
    return 'partial';
  };

  const getBookedSlots = (date: Date | null) => {
    if (!date) return [];
    const dateNum = date.getDate();
    
    if (dateNum % 3 === 0) return workingHours;
    if (dateNum % 5 === 0) return [];
    
    return ['11:00', '14:00', '17:00'];
  };

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const days = getDaysInMonth();
  const today = new Date();
  const currentMonth = monthNames[today.getMonth()];
  const currentYear = today.getFullYear();

  const bookedSlots = getBookedSlots(selectedDate);

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      <div className="max-w-md mx-auto px-4 pt-6 pb-24">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Запись на ремонт</h1>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-muted"
          >
            <Icon name="X" size={24} />
          </Button>
        </div>

        <Card className="p-5 bg-card border-border mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">{currentMonth} {currentYear}</h2>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-muted-foreground">Свободно</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-muted-foreground">Занято</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
              <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days.map((day, idx) => {
              if (!day) return <div key={`empty-${idx}`} />;
              
              const status = getAvailabilityStatus(day);
              const isSelected = selectedDate?.getDate() === day.getDate();
              const isPast = status === 'past';
              
              let bgColor = 'bg-muted';
              let borderColor = 'border-transparent';
              let textColor = 'text-white';
              
              if (isPast) {
                textColor = 'text-muted-foreground/40';
              } else if (status === 'busy') {
                bgColor = 'bg-red-500/20';
                borderColor = 'border-red-500/50';
              } else if (status === 'free') {
                bgColor = 'bg-green-500/20';
                borderColor = 'border-green-500/50';
              } else {
                bgColor = 'bg-yellow-500/20';
                borderColor = 'border-yellow-500/50';
              }
              
              if (isSelected) {
                borderColor = 'border-primary';
                bgColor = 'bg-primary/30';
              }
              
              return (
                <button
                  key={idx}
                  onClick={() => !isPast && setSelectedDate(day)}
                  disabled={isPast}
                  className={`aspect-square rounded-xl border-2 ${bgColor} ${borderColor} ${textColor} 
                    font-medium text-sm transition-all hover:scale-105 disabled:hover:scale-100 
                    disabled:cursor-not-allowed flex items-center justify-center`}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </Card>

        {selectedDate && (
          <Card className="p-5 bg-card border-border animate-slide-up">
            <h3 className="font-semibold text-white mb-4">
              Выберите время на {selectedDate.getDate()} {currentMonth.toLowerCase()}
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {workingHours.map(time => {
                const isBooked = bookedSlots.includes(time);
                const isSelected = selectedTime === time;
                
                return (
                  <button
                    key={time}
                    onClick={() => !isBooked && setSelectedTime(time)}
                    disabled={isBooked}
                    className={`py-3 px-4 rounded-xl font-medium text-sm transition-all
                      ${isBooked 
                        ? 'bg-muted text-muted-foreground line-through cursor-not-allowed' 
                        : isSelected
                          ? 'bg-primary text-white scale-105'
                          : 'bg-card border-2 border-border text-white hover:border-primary hover:scale-105'
                      }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </Card>
        )}

        {selectedDate && selectedTime && (
          <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border p-4">
            <div className="max-w-md mx-auto">
              <Button 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold py-6"
                onClick={() => {
                  alert(`Запись создана на ${selectedDate.getDate()} ${currentMonth} в ${selectedTime}`);
                  onClose();
                }}
              >
                <Icon name="Check" size={20} className="mr-2" />
                Подтвердить запись на {selectedDate.getDate()} {currentMonth} в {selectedTime}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCalendar;
