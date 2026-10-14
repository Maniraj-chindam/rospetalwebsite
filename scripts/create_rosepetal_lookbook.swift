import AppKit
import AVFoundation
import CoreVideo

let outputURL = URL(fileURLWithPath: CommandLine.arguments.dropFirst().first ?? "public/rosepetal-4k-lookbook.mp4")
let canvas = CGSize(width: 3840, height: 2160)
let framesPerSecond = 24
let durationSeconds = 15
let frameCount = framesPerSecond * durationSeconds
let inputPaths = [
    "public/thridha-handloom-02.webp",
    "public/video-maggam-work.png",
    "public/video-designer-dresses.png",
    "public/video-handloom-collection.png",
    "public/video-designer-frocks.png",
    "public/video-lehengas.png",
]
let collectionHeadlines = [
    "Sarees\nTimeless elegance.",
    "Maggam Work\nCrafted to shine.",
    "Designer Dresses\nMade for your moment.",
    "Handloom Collection\nWoven with heritage.",
    "Designer Frocks\nGrace in motion.",
    "Lehengas\nFor your special days.",
]

func cgImage(from path: String) -> CGImage {
    guard let image = NSImage(contentsOfFile: path),
          let data = image.tiffRepresentation,
          let bitmap = NSBitmapImageRep(data: data),
          let cgImage = bitmap.cgImage else {
        fatalError("Could not load image: \(path)")
    }
    return cgImage
}

func aspectFillRect(image: CGImage, in canvas: CGSize, scale: CGFloat) -> CGRect {
    let source = CGSize(width: image.width, height: image.height)
    let fillScale = max(canvas.width / source.width, canvas.height / source.height) * scale
    let rendered = CGSize(width: source.width * fillScale, height: source.height * fillScale)
    return CGRect(
        x: (canvas.width - rendered.width) / 2,
        y: (canvas.height - rendered.height) / 2,
        width: rendered.width,
        height: rendered.height
    )
}

func easeInOut(_ value: CGFloat) -> CGFloat {
    let limited = min(max(value, 0), 1)
    return limited * limited * (3 - 2 * limited)
}

func drawText(_ text: String, at point: CGPoint, fontSize: CGFloat, color: NSColor, tracking: CGFloat = 0) {
    let paragraph = NSMutableParagraphStyle()
    paragraph.alignment = .left
    let attributed = NSAttributedString(
        string: text,
        attributes: [
            .font: NSFont(name: "Times New Roman", size: fontSize) ?? NSFont.systemFont(ofSize: fontSize),
            .foregroundColor: color,
            .kern: tracking,
            .paragraphStyle: paragraph,
        ]
    )
    attributed.draw(at: point)
}

let images = inputPaths.map(cgImage)
try? FileManager.default.removeItem(at: outputURL)

let writer = try AVAssetWriter(outputURL: outputURL, fileType: .mp4)
let videoInput = AVAssetWriterInput(mediaType: .video, outputSettings: [
    AVVideoCodecKey: AVVideoCodecType.h264,
    AVVideoWidthKey: Int(canvas.width),
    AVVideoHeightKey: Int(canvas.height),
    AVVideoCompressionPropertiesKey: [
        AVVideoAverageBitRateKey: 20_000_000,
        AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
    ],
])
videoInput.expectsMediaDataInRealTime = false

let pixelBufferAttributes: [String: Any] = [
    kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA,
    kCVPixelBufferWidthKey as String: Int(canvas.width),
    kCVPixelBufferHeightKey as String: Int(canvas.height),
    kCVPixelBufferCGImageCompatibilityKey as String: true,
    kCVPixelBufferCGBitmapContextCompatibilityKey as String: true,
]
let adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: videoInput, sourcePixelBufferAttributes: pixelBufferAttributes)
writer.add(videoInput)
writer.startWriting()
writer.startSession(atSourceTime: .zero)

for frame in 0..<frameCount {
    while !videoInput.isReadyForMoreMediaData {
        Thread.sleep(forTimeInterval: 0.002)
    }

    guard let buffer = adaptor.pixelBufferPool.flatMap({ pool in
        var pixelBuffer: CVPixelBuffer?
        CVPixelBufferPoolCreatePixelBuffer(nil, pool, &pixelBuffer)
        return pixelBuffer
    }) else {
        fatalError("Could not create pixel buffer")
    }

    CVPixelBufferLockBaseAddress(buffer, [])
    defer { CVPixelBufferUnlockBaseAddress(buffer, []) }
    guard let base = CVPixelBufferGetBaseAddress(buffer),
          let context = CGContext(
            data: base,
            width: Int(canvas.width),
            height: Int(canvas.height),
            bitsPerComponent: 8,
            bytesPerRow: CVPixelBufferGetBytesPerRow(buffer),
            space: CGColorSpaceCreateDeviceRGB(),
            bitmapInfo: CGImageAlphaInfo.premultipliedFirst.rawValue | CGBitmapInfo.byteOrder32Little.rawValue
          ) else {
        fatalError("Could not draw video frame")
    }

    context.setFillColor(NSColor(red: 0.15, green: 0.05, blue: 0.08, alpha: 1).cgColor)
    context.fill(CGRect(origin: .zero, size: canvas))

    let progress = CGFloat(frame) / CGFloat(frameCount - 1)
    let segmentValue = progress * CGFloat(images.count)
    let segment = min(Int(segmentValue), images.count - 1)
    let segmentProgress = segmentValue.truncatingRemainder(dividingBy: 1)
    let image = images[segment]
    let scale = 1.04 + 0.07 * easeInOut(segmentProgress)
    context.draw(image, in: aspectFillRect(image: image, in: canvas, scale: scale))

    let topShade = CGGradient(
        colorsSpace: CGColorSpaceCreateDeviceRGB(),
        colors: [NSColor.black.withAlphaComponent(0.48).cgColor, NSColor.clear.cgColor] as CFArray,
        locations: [0, 0.65]
    )!
    context.drawLinearGradient(topShade, start: CGPoint(x: 0, y: canvas.height), end: CGPoint(x: 0, y: canvas.height * 0.35), options: [])

    let bottomShade = CGGradient(
        colorsSpace: CGColorSpaceCreateDeviceRGB(),
        colors: [NSColor.black.withAlphaComponent(0.60).cgColor, NSColor.clear.cgColor] as CFArray,
        locations: [0, 0.75]
    )!
    context.drawLinearGradient(bottomShade, start: .zero, end: CGPoint(x: 0, y: canvas.height * 0.55), options: [])

    let fadeDuration: CGFloat = 0.18
    let transition = min(easeInOut(segmentProgress / fadeDuration), easeInOut((1 - segmentProgress) / fadeDuration), 1)
    let textOpacity = max(0.0, transition)
    let graphicsContext = NSGraphicsContext(cgContext: context, flipped: false)
    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = graphicsContext
    drawText("ROSEPETAL", at: CGPoint(x: 250, y: 1890), fontSize: 80, color: .white.withAlphaComponent(textOpacity), tracking: 15)
    drawText("DESIGNER BOUTIQUE", at: CGPoint(x: 255, y: 1810), fontSize: 27, color: .white.withAlphaComponent(textOpacity * 0.88), tracking: 8)
    let headline = collectionHeadlines[segment]
    drawText(headline, at: CGPoint(x: 250, y: 360), fontSize: 116, color: .white.withAlphaComponent(textOpacity), tracking: 1)
    NSGraphicsContext.restoreGraphicsState()

    let presentationTime = CMTime(value: CMTimeValue(frame), timescale: CMTimeScale(framesPerSecond))
    adaptor.append(buffer, withPresentationTime: presentationTime)
}

videoInput.markAsFinished()
writer.finishWriting {
    guard writer.status == .completed else {
        fputs("Video export failed: \(writer.error?.localizedDescription ?? "Unknown error")\n", stderr)
        exit(1)
    }
    print("Created \(outputURL.path)")
    exit(0)
}
RunLoop.current.run()
