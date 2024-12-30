// import { useRouter } from 'next/router';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Plus, Search, CreditCard } from 'lucide-react';

// export function QuickActionsSection() {
//   const router = useRouter();

//   const handleCreateAuction = () => {
//     router.push('/auctions/create');
//   };

//   const handleTrackOrder = () => {
//     router.push('/orders/track');
//   };

//   const handleMakePayment = () => {
//     router.push('/payments');
//   };

//   return (
//     <Card className="shadow-lg border border-gray-200">
//       <CardHeader>
//         <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
//         <CardDescription className="text-gray-500">
//           Frequently used actions
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="flex flex-col space-y-2">
//         <Button
//           className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center"
//           onClick={handleCreateAuction}
//         >
//           <Plus className="mr-2 h-4 w-4" /> Create Auction
//         </Button>
//         <Button
//           className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center"
//           onClick={handleTrackOrder}
//         >
//           <Search className="mr-2 h-4 w-4" /> Track Order
//         </Button>
//         <Button
//           className="w-full bg-purple-500 hover:bg-purple-600 text-white flex items-center justify-center"
//           onClick={handleMakePayment}
//         >
//           <CreditCard className="mr-2 h-4 w-4" /> Make Payment
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }
