import { useEffect } from "react";
import V86 from "./libv86";

export const V86Component = () => {
  const [emulator, setV86instance] = useState < any > null;
  useEffect(() => {
    const v86Starter = new V86.V86Starter({
      wasm_path: "../build/v86.wasm",
      memory_size: 512 * 1024 * 1024,
      vga_memory_size: 8 * 1024 * 1024,
      screen_container: document.getElementById("screen_container"),
      bios: {
        url: "../bios/seabios.bin",
      },
      vga_bios: {
        url: "../bios/vgabios.bin",
      },
      filesystem: {
        baseurl: "../images/arch/",
        basefs: "../images/fs.json",
      },
      autostart: true,
      bzimage_initrd_from_filesystem: true,
      cmdline: [
        "rw",
        "root=host9p rootfstype=9p rootflags=trans=virtio,cache=loose",
        "init=/usr/bin/init-openrc",
      ].join(" "),
    });
    setV86instance(v86Starter);
  }, [emulator]);

  const saveFile = document.getElementById("save_file");

  saveFile.onclick(() => {
    emulator.save_state(function (error, new_state) {
      if (error) {
        throw error;
      }

      var a = document.createElement("a");
      a.download = "v86state.bin";
      a.href = window.URL.createObjectURL(new Blob([new_state]));
      a.dataset.downloadurl =
        "application/octet-stream:" + a.download + ":" + a.href;
      a.click();
    });

    this.blur();
  });

  const restoreFile = document.getElementById("restore_file");

  restoreFile.onclick(() => {
    {
      if (this.files.length) {
        var filereader = new FileReader();
        emulator.stop();

        filereader.onload = function (e) {
          emulator.restore_state(e.target.result);
          emulator.run();
        };

        filereader.readAsArrayBuffer(this.files[0]);

        this.value = "";
      }

      this.blur();
    }
    this.blur();
  });

  document;
  return (
    <>
      <input id="save_file" type="button" value="Save state to file" />
      Restore from file: <input id="restore_file" type="file" />
      <hr />
      <div id="screen_container">
        <div style="white-space: pre; font: 14px monospace; line-height: 14px"></div>
        <canvas style="display: none"></canvas>
      </div>
    </>
  );
};
