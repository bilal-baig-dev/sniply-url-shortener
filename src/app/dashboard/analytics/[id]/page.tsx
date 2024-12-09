"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { AnalyticsDashboardData } from "@/interfaces";
import { getAnalyticsByShortUrlId } from "@/actions/db";
import { ChartContainer } from "@/components/ui/chart";
import moment from "moment";
import Flex from "@/components/common/Flex";
const formatDate = (date: string) => moment(date).format("MMM D");

export default function AnalyticsPage() {
  const { id } = useParams();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const fetchAnalyticsDatByUrlId = async () => {
    setLoading(true);
    const analytics = await getAnalyticsByShortUrlId(id as string);
    console.log({ analytics });
    setAnalyticsData(analytics);
    setLoading(false);
  };

  useEffect(() => {
    fetchAnalyticsDatByUrlId();
  }, [id]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-nowrap font-bold">
        <Flex className="items-center gap-2">
          Performance Analytics for: {loading ? <Skeleton className="h-10 w-48" /> : analyticsData?.shortURL}
        </Flex>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Card className="shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>{loading ? <Skeleton className="h-10 w-20" /> : <p className="text-4xl font-bold">{analyticsData?.clicks}</p>}</CardContent>
        </Card>
        <Card className="shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle>Unique Visitor</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="h-10 w-20" /> : <p className="text-4xl font-bold">{analyticsData?.uniqueClicks}</p>}
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle>Top Country</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <p className="text-2xl font-bold">{Object.entries(analyticsData?.countries || {}).sort((a, b) => b[1] - a[1])[0]?.[0]}</p>
            )}
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle>Top Device</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <p className="text-2xl font-bold">{Object.entries(analyticsData?.devices || {}).sort((a, b) => b[1] - a[1])[0]?.[0]}</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="w-full hover-effect">
        <CardHeader>
          <CardTitle>Click Analytics</CardTitle>
          <CardDescription>Number of clicks over time</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : analyticsData?.clicksOverTime?.length ? (
            <ChartContainer
              config={{
                clicks: {
                  label: "Clicks",
                  color: "hsl(var(--primary))",
                },
              }}
              className="w-full h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData?.clicksOverTime} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeWidth="2" vertical={false} horizontal={true} />
                  <XAxis
                    tickFormatter={formatDate}
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--foreground))" }}
                    interval={Math.ceil(analyticsData?.clicksOverTime.length / 9)}
                  />

                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--foreground))" }} />

                  <Tooltip
                    formatter={(value) => [`${value} clicks`, "Date"]}
                    labelFormatter={(label) => formatDate(label)}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                                <span className="font-bold text-muted-foreground">{formatDate(payload[0].payload.date)}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">Clicks</span>
                                <span className="font-bold">{payload[0].value}</span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="clicks"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1000}
                    animationEasing="ease-out"
                    barSize={40}
                  >
                    {analyticsData?.clicksOverTime.map((entry, index) => (
                      <rect
                        key={`bar-${index}`}
                        fillOpacity={0.9}
                        className="transition-all duration-300 ease-in-out hover:fill-opacity-100 hover:brightness-110 hover:filter"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px]  rounded">
              <p className="text-2xl text-gray-500">No data available</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Top Countries</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Country</TableHead>
                  <TableHead>Clicks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Skeleton className="h-4 w-24" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-12" />
                        </TableCell>
                      </TableRow>
                    ))
                  : Object.entries(analyticsData?.countries || {})
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 5)
                      .map(([country, clicks]) => (
                        <TableRow key={country}>
                          <TableCell>{country}</TableCell>
                          <TableCell>{clicks}</TableCell>
                        </TableRow>
                      ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source</TableHead>
                  <TableHead>Clicks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Skeleton className="h-4 w-24" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-12" />
                        </TableCell>
                      </TableRow>
                    ))
                  : Object.entries(analyticsData?.sources || {})
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 5)
                      .map(([source, clicks]) => (
                        <TableRow key={source}>
                          <TableCell>{source}</TableCell>
                          <TableCell>{clicks}</TableCell>
                        </TableRow>
                      ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
