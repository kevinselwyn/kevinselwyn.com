---
title: "Trombones Adjusted for Inflation"
description: "Adjusting The Music Man's Instrumentation For The Modern Age"
date: 2019-04-19T14:58:04-04:00
categories: ["math"]
tags: ["random"]
css: ["/css/posts/trombones-adjusted-for-inflation/style.css"]
---

In addition to being a software engineer, I also hold a Bachelor of Fine Arts in
Musical Theatre, so when these two worlds collide, I get very excited.

Meredith Willson's The Music Man has always been a favorite musical of mine
(despite my perpetual outrage that it beat West Side Story and took the Tony
Award home in 1957).

![The Music Man](/img/posts/trombones-adjusted-for-inflation/music-man.gif)

One of the most exciting numbers in the show is "Seventy-Six Trombones", where
Professor Harold Hill gets the town of River City, Iowa hyped about the
possibility of their very own marching band.

The lyrics mention:

```
Seventy-six trombones led the big parade
With a hundred and ten cornets close at hand
```

With a <a href="http://www.playbill.com/article/hugh-jackman-to-star-in-the-music-man-on-broadway"
target="_blank">new production</a>
being mounted on Broadway in 2020, I wondered how they would update the show
for modern times.

One such way would be adjusting the number of trombones (and cornets for good
measure) for inflation, having their number move in parallel with the buying
power of the United States Dollar.

## Getting The Data

USD inflation data is available in many locations, but a nice, neat table exists
on the website for the US Inflation Calculator. The data we're specifically
looking for is <a href="https://www.usinflationcalculator.com/inflation/consumer-price-index-and-annual-percent-changes-from-1913-to-2008/"
target="_blank">CPI (Consumer Price Index)</a>.

CPI as defined by the Bureau of Labor Statistics is:

```
a measure of the average change over time in the prices paid by urban consumers
for a market basket of consumer goods and services.
```

Here's the average data from 1913 to 2018:

|year |cpi     |
|-----|--------|
|1913 |9.9     |
|1914 |10      |
|1915 |10.1    |
|1916 |10.9    |
|1917 |12.8    |
|1918 |15.1    |
|1919 |17.3    |
|1920 |20      |
|1921 |17.9    |
|1922 |16.8    |
|1923 |17.1    |
|1924 |17.1    |
|1925 |17.5    |
|1926 |17.7    |
|1927 |17.4    |
|1928 |17.1    |
|1929 |17.1    |
|1930 |16.7    |
|1931 |15.2    |
|1932 |13.7    |
|1933 |13      |
|1934 |13.4    |
|1935 |13.7    |
|1936 |13.9    |
|1937 |14.4    |
|1938 |14.1    |
|1939 |13.9    |
|1940 |14      |
|1941 |14.7    |
|1942 |16.3    |
|1943 |17.3    |
|1944 |17.6    |
|1945 |18      |
|1946 |19.5    |
|1947 |22.3    |
|1948 |24.1    |
|1949 |23.8    |
|1950 |24.1    |
|1951 |26      |
|1952 |26.5    |
|1953 |26.7    |
|1954 |26.9    |
|1955 |26.8    |
|1956 |27.2    |
|1957 |28.1    |
|1958 |28.9    |
|1959 |29.1    |
|1960 |29.6    |
|1961 |29.9    |
|1962 |30.2    |
|1963 |30.6    |
|1964 |31      |
|1965 |31.5    |
|1966 |32.4    |
|1967 |33.4    |
|1968 |34.8    |
|1969 |36.7    |
|1970 |38.8    |
|1971 |40.5    |
|1972 |41.8    |
|1973 |44.4    |
|1974 |49.3    |
|1975 |53.8    |
|1976 |56.9    |
|1977 |60.6    |
|1978 |65.2    |
|1979 |72.6    |
|1980 |82.4    |
|1981 |90.9    |
|1982 |96.5    |
|1983 |99.6    |
|1984 |103.9   |
|1985 |107.6   |
|1986 |109.6   |
|1987 |113.6   |
|1988 |118.3   |
|1989 |124     |
|1990 |130.7   |
|1991 |136.2   |
|1992 |140.3   |
|1993 |144.5   |
|1994 |148.2   |
|1995 |152.4   |
|1996 |156.9   |
|1997 |160.5   |
|1998 |163     |
|1999 |166.6   |
|2000 |172.2   |
|2001 |177.1   |
|2002 |179.9   |
|2003 |184     |
|2004 |188.9   |
|2005 |195.3   |
|2006 |201.6   |
|2007 |207.3   |
|2008 |215.303 |
|2009 |214.537 |
|2010 |218.056 |
|2011 |224.939 |
|2012 |229.594 |
|2013 |232.957 |
|2014 |236.736 |
|2015 |237.017 |
|2016 |240.007 |
|2017 |245.12  |
|2018 |251.107 |

## Analyzing The Data

Now that we have our historical data, all that's left to do is some easy math.

But from which year should we start adjusting?

* `1912` - The year The Music Man is set, or
* `1957` - The year The Music Man premiered on Broadway?

Why not both?!

**NOTE: We will be using the 2018 CPI because at the time of writing, 2019 is
not over...and 2020 has not yet begun. So 2018 will get us as close as we can.**

The math is:

```
Old trombones * (New CPI / Old CPI) = New trombones
```

So for 1912 dollars (really 1913 dollars is as close as we can get):

```
76 * (251.107 / 9.9) = 1927.6901010101008
110 * (251.107 / 9.9) = 2790.0777777777776
```

I can hear it now:

```
One thousand nine hundred and twenty-seven trombones led the big parade
With two thousand seven hundred and ninety cornets close at hand
```

Things are a little less impressive with 1957 money:

```
76 * (251.107 / 28.1) = 679.1506049822063
110 * (251.107 / 28.1) = 982.9811387900355
```

One more time:

```
Six hundred seventy-nine trombones led the big parade
With nine hundred eighty-two cornets close at hand
```

Dear Broadway,

I am available as a consult for historial brass-based inflationary accuracy.
