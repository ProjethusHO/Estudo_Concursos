import sys
import fitz  # PyMuPDF
import PyPDF2

def extract_text(pdf_path, txt_path):
    text = ""
    # Try PyMuPDF first
    try:
        doc = fitz.open(pdf_path)
        for page in doc:
            text += page.get_text() + "\n"
    except Exception as e1:
        # Fallback to PyPDF2
        try:
            with open(pdf_path, 'rb') as f:
                reader = PyPDF2.PdfReader(f)
                for page in reader.pages:
                    text += page.extract_text() + "\n"
        except Exception as e2:
            print(f"Error extracting with both PyMuPDF and PyPDF2. PyMuPDF: {e1}, PyPDF2: {e2}")
            sys.exit(1)
            
    with open(txt_path, 'w', encoding='utf-8') as f:
        f.write(text)
    print("Success")

if __name__ == "__main__":
    extract_text(sys.argv[1], sys.argv[2])
