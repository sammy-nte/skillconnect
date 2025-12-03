import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

function page() {
  const recentBookings = [
    {
      id: 1,
      service: "Plumbing",
      worker: "John Martinez",
      date: "2024-11-08",
      status: "Completed",
      amount: "$130",
    },
    {
      id: 2,
      service: "Electrical",
      worker: "Sarah Chen",
      date: "2024-11-12",
      status: "Scheduled",
      amount: "$85",
    },
    {
      id: 3,
      service: "Carpentry",
      worker: "Mike Thompson",
      date: "2024-11-05",
      status: "In Progress",
      amount: "$200",
    },
  ];
  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">My Bookings</h2>
        <button className="!rounded-button whitespace-nowrap cursor-pointer">
          Book New Service
        </button>
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-wrench text-blue-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {booking.service}
                    </h4>
                    <p className="text-sm text-gray-600">{booking.worker}</p>
                    <p className="text-sm text-gray-500">{booking.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge
                    variant={
                      booking.status === "Completed"
                        ? "default"
                        : booking.status === "Scheduled"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {booking.status}
                  </Badge>
                  <span className="font-medium text-gray-900">
                    {booking.amount}
                  </span>
                  <button
                    variant="outline"
                    size="sm"
                    className="rounded-sm border px-3 whitespace-nowrap cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default page;
