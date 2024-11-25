# mpegh-to-wav-online
Online MPEG-H to WAV converter. Decodes MPEG-H through the open source mpeghdec decoder.

## Compiling the modified decoder for Emscripten
1. Checkout mpeghdec
2. `emcmake cmake -S . -B build -DCMAKE_BUILD_TYPE=Release -DCMAKE_CXX_FLAGS="-sNO_DISABLE_EXCEPTION_CATCHING -s EXPORTED_RUNTIME_METHODS=['callMain'] -sSTACK_SIZE=5MB -O3"`
3. Find `mmtisobmff-src/src/reader/trackreader.cpp`, comment out line `ILO_ASSERT(stsdElement.childCount() == 1, "Only a single sample entry is supported");`
4. Find `demo/mpeghDecoder/main_mpeghDecoder.cpp`, replace `std::cout << "Samples processed: " << sampleCounter << "\r" << std::flush;` with
   ```
        if (sampleCounter % 100 == 0) {
          std::cout << "Processed " << sampleCounter << " samples (" << std::setprecision(2)
                    << std::fixed << (100.0f * sampleCounter / trackInfo.sampleCount) << "%)" << std::endl;
        }
   ```
7. `cmake --build build --config Release -j8`
