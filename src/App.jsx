import React, { useRef, useState, useEffect } from 'react'

const App = () => {
  // State to track scroll percentage and circle position
  const [scrollPercentage, setScrollPercentage] = useState(0)
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 })

  // State to track rotation for the polygon
  const [rotation, setRotation] = useState(0)

  // Refs for SVG elements
  const polygonRef = useRef(null)
  const circleRef = useRef(null)

  // Effect to update rotation of the polygon
  useEffect(() => {
    if (polygonRef.current) {
      polygonRef.current.setAttribute(
        'transform',
        `rotate(${rotation - 90} 639.81226 615.1311)`,
      )
    }
  }, [rotation])

  // Effect to update circle position based on scroll percentage
  useEffect(() => {
    const path = document.getElementById('myPath')
    const pathLength = path.getTotalLength()
    const desiredLength = pathLength * scrollPercentage - 0.1

    const point = path.getPointAtLength(desiredLength)

    setCirclePosition({ x: point.x, y: point.y })

    // Rotation of the circle
    const nextPoint = path.getPointAtLength(desiredLength + 1)
    const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x)
    const degrees = (angle * 180) / Math.PI
    setRotation(degrees)
  }, [scrollPercentage])

  // Effect to update scroll percentage on window scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const clientHeight = document.documentElement.clientHeight

      const scrollPercent = scrollTop / (scrollHeight - clientHeight)
      setScrollPercentage(scrollPercent)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Rendering of SVG components
  return (
    <>
      <div className="relative">
        <svg
          className="p-8 self-center transition-all"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 1250 2200"
          xmlSpace="preserve"
          preserveAspectRatio="xMidYMid meet"
        >
          <style
            type="text/css"
            dangerouslySetInnerHTML={{
              __html:
                '\n\t.st0{fill:none;stroke:#000000;stroke-width:1;stroke-miterlimit:20;stroke-dasharray:10,7;}\n',
            }}
          />
          {/* SVG Path */}
          <g transform="translate(220, 220)">
            <path
              id="myPath"
              className="st0"
              d="M391.01581,2c0,35.61279-29.13699,64.75-64.75012,64.75H100.8349c-53.9005,0-98.0003,44.09973-98.0003,98
                v421.43787c0,53.90015,44.1,97.99988,98.0003,97.99988h583.18719c52.14728,0,94.81268,42.66516,94.81268,94.81268v199.18744
                c0,52.14697-42.66565,94.81262-94.81268,94.81262H97.6473c-52.1473,0-94.8127,42.66516-94.8127,94.81274v199.18726
                c0,52.14709,42.6654,94.81274,94.8127,94.81274h397.133c52.14731,0,94.81271,42.66516,94.81271,94.81274v199.18738"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0; -10000"
                dur="500s"
                repeatCount="indefinite"
              />
            </path>
          </g>
          {/* Moving Circle  */}
          <svg
            ref={circleRef}
            className="w-8 h-8 scroll-smooth"
            id="movingCircle"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 3500 3500"
            xmlSpace="preserve"
            x={circlePosition.x}
            y={circlePosition.y}
          >
            <style
              type="text/css"
              dangerouslySetInnerHTML={{
                __html:
                  '\n\t.st1{fill:white;stroke:#000000;stroke-width:2;stroke-miterlimit:20;stroke-dasharray:25,12;}\n\t.st2{fill-rule:evenodd;clip-rule:evenodd;fill:#E6E6E6;}\n\t.st3{fill-rule:evenodd;clip-rule:evenodd;}\n',
              }}
            />
            <g transform="translate(-25, -1338)">
              <g ref={polygonRef}>
                <circle
                  className="st1"
                  cx="639.81226"
                  cy="615.52826"
                  r="158.00006"
                ></circle>
                <path
                  className="st2"
                  d="M639.81226,539.0282c42.24976,0,76.5,34.25024,76.5,76.5s-34.25024,76.5-76.5,76.5s-76.5-34.25024-76.5-76.5
                    S597.5625,539.0282,639.81226,539.0282"
                />
                <polygon
                  className="st3"
                  points="639.81226,644.13086 654.62476,618.4754 669.35522,592.9613 639.81226,615.1311 610.26904,592.96082 624.99976,618.4751"
                />
                <animate
                  attributeName="stroke-dashoffset"
                  values="0; -10000"
                  dur="150s"
                  repeatCount="indefinite"
                />
              </g>
            </g>
          </svg>
        </svg>
      </div>
      <div className="absolute"></div>
    </>
  )
}

export default App
