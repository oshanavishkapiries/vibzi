/* eslint-disable react/no-unescaped-entities */

import { Clock, Phone, Globe, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TourDetails({ textData }: any) {
  return (
    <div className="max-w-7xl mx-auto space-y-6 py-2 px-[30px] md:px-[60px]">
      {/* Tour Quick Info */}
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>4 hours (approx.)</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          <span>Mobile Ticket</span>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span>Offered in: English</span>
        </div>
      </div>

      {/* Overview */}
      <Card className="shadow-none border-none">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>{textData?.data?.description}</p>
          {textData?.data?.additionalInfo && (
            <ul className="space-y-2 list-disc pl-6">
              {textData?.data?.additionalInfo.map((item: any, index: number) => (
                <li key={index}>{item.description}</li>
              ))}
            </ul>
          )}
          {/* <ul className="space-y-2 list-disc pl-6">
            <li>
              See the city lights illuminating Bangkok's temples, palaces, and
              landmarks
            </li>
            <li>
              Go on a guided tour of Bangkok's 24-hour flower market, Pak Khlong
              Talat
            </li>
            <li>
              Includes dinner at a local restaurant and street food snacks and
              desserts
            </li>
            <li>
              Choose between a small-group tour—maximum 10 travelers—or a
              private tour
            </li>
          </ul> */}
        </CardContent>
      </Card>

      {/* What's Included */}
      <Card className="shadow-none border-none">
        <CardHeader>
          <CardTitle>What's Included</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {textData?.data?.inclusions.map((item: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{item.description}</span>
              </div>
            ))}

            {textData?.data?.exclusions.map((item: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <X className="h-4 w-4 text-red-500" />
                <span>{item.description}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Meeting and Pickup */}
      <Card className="shadow-none border-none">
        <CardHeader>
          <CardTitle>Meeting and Pickup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold">Meeting Point</h3>
              <p>Lawson 108 BTS Krung Thonburi</p>
              <p className="text-sm text-muted-foreground">
                สถานีรถไฟฟ้า BTS สำนักงานเขต ครุงธน S7 ถนน, เเขวงคลองต้นไทร
                เขตคลองสาน กรุงเทพมหานคร 10600, Thailand
              </p>
              <Button variant="outline" className="mt-2">
                Open in Google Maps
              </Button>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">End Point</h3>
              <p>Lawson 108 BTS Krung Thonburi</p>
              <p className="text-sm text-muted-foreground">
                สถานีรถไฟฟ้า BTS สำนักงานเขต ครุงธน S7 ถนน, เเขวงคลองต้นไทร
                เขตคลองสาน กรุงเทพมหานคร 10600, Thailand
              </p>
              <Button variant="outline" className="mt-2">
                Open in Google Maps
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What to Expect */}
      <Card className="shadow-none border-none">
        <CardHeader>
          <CardTitle>What to Expect</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Begin your private or small-group night tour of Bangkok by meeting
            your guide at a handy centrally located BTS station. From there, hop
            into a tuk tuk, which is one of the quickest—and most exciting—ways
            of getting around the busy city.
          </p>
          <p>
            During the 4-hour tour, your guide will take you to a variety of
            places that come alive at night, including the Pak Khlong Talat
            flower market, Chinatown, and Wat Arun. You'll also see many Bangkok
            landmarks lit up after dark.
          </p>
          <p>
            Going with a guide ensures you stick to the safest areas while
            getting an intimate perspective of the city. Enjoy a tasty local
            dinner with non-alcoholic drinks and dessert—your guide can help you
            choose dishes to suit your tastes.
          </p>
          <p>
            After the tour, you can be dropped at your location of choice,
            within a limited area. Head back to your accommodation or continue
            the evening adventures independently.
          </p>
        </CardContent>
      </Card>

      {/* Additional Info */}
      <Card className="shadow-none border-none">
        <CardHeader>
          <CardTitle>Additional Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <ul className="space-y-2 list-disc pl-6">
              <li>Confirmation will be received at time of booking</li>
              <li>Not wheelchair accessible</li>
              <li>
                We meet at a BTS (Skytrain) Station as traffic in the evening
                can be bad. Strongly encourage guests to take the Skytrain /
                Public Transport to our meeting point
              </li>
              <li>Not recommended for pregnant travelers</li>
              <li>Most travelers can participate</li>
              <li>
                If it rains it is more fun! We run the tour throughout the year
                and have never had to cancel a tour due to rain. If it rains we
                have ponchos, rain covers and umbrellas. You may get a little
                wet but if you bring a positive attitude you may discover it is
                even more fun!
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
